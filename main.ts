import express from "npm:express";
import setupConfig from "./src/config.ts";
import { setupDB } from "./src/db.ts";
import { acctToSplitName } from "./lib/fedi.ts";
import { User } from "./lib/models.ts";
import { ErrorPage } from "./lib/templates.ts";

// Initialize Express
const app = express();

// Load Config
const config = setupConfig();

// Log that Xepi is starting and has loaded configuration successfully
console.log(
  `Starting Xepi at http://${config.host}${
    config.port != 80 ? ":" + config.port : ""
  }/${config.rootURL}`,
);

// Configure database
let db = await setupDB(config.dbURI);

// Routes

// Root URL
app.get(
  `/${config.rootURL}` + "api/",
  (_req: express.req, res: express.res) => {
    res.status(200).send().end();
  },
);

// Webfinger Endpoint
if (config.options?.serveWellKnown == true) {
  app.get(
    "/.well-known/webfinger",
    async (req: express.req, res: express.res) => {
      if (req.query != undefined && typeof (req.query.resource) == "string") {
        let requestedUser;
        try {
          requestedUser = acctToSplitName(req.query.resource);
        } catch (error) {
          if (
            error instanceof TypeError &&
            error.message == "Invalid String for Parsing"
          ) {
            res.status(400).send(new ErrorPage(400, undefined, error)).end();
            return;
          } else {
            res.status(500).send(new ErrorPage(500)).end();
            throw error;
          }
        }
        const foundUser = await User.where({
          userID: `${requestedUser.username}@${requestedUser.host}`,
        }).first();
        if (
          foundUser != null && foundUser.userID != undefined &&
          foundUser.username && foundUser.host
        ) {
          res.status(200).send({
            subject: `acct:${foundUser.userID}`,
            aliases: [
              `http://${config.host}${
                config.port != 80 ? ":" + config.port : ""
              }/${config.rootURL}@${foundUser.username}@${foundUser.host}`,
              `http://${config.host}${
                config.port != 80 ? ":" + config.port : ""
              }/${config.rootURL}users/${foundUser.username}`,
            ],
          }).end();
        } else if (foundUser == null) {
          res.status(404).end();
          return;
        } else {
          res.status(500).end();
        }
      } else {
        res.status(400).end();
      }
    },
  );
}

// Start Express
app.listen(config.port, () => {
  console.log(
    `Xepi is running at http://${config.host}${
      config.port != 80 ? ":" + config.port : ""
    }/${config.rootURL}`,
  );
});
