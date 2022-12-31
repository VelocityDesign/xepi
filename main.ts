import express from "npm:express";
import setupConfig from "./src/config.ts";

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

// Routes
app.get(`/${config.rootURL}`+"api/", (_req: express.req, res: express.res) => {
    res.status(200).send().end()
})

// Start Express
app.listen(config.port, () => {
    console.log(`Xepi is running at http://${config.host}${
        config.port != 80 ? ":" + config.port : ""
      }/${config.rootURL}`,)
});
