import { XepiConfig } from "../lib/types.ts";

// Load dotenv
import "https://deno.land/std/dotenv/load.ts";

export default function (): XepiConfig {
  // deno-lint-ignore prefer-const
  let config: XepiConfig = {
    host: "",
    port: NaN,
    rootURL: "",
    dbURI: "",
    options: {},
  };

  let failed = false;

  // Get host from environment
  const host = Deno.env.get("HOST");
  const domain = Deno.env.get("DOMAIN");
  if (host != undefined) {
    config.host = host;
  } else if (domain != undefined) {
    console.warn("Falling back to the DOMAIN environment variable");
    config.host = domain;
  } else {
    console.warn("No host specified... Using default host 'localhost'");
    config.host = "localhost";
  }

  // Get rootURL from environment
  let rootURL = Deno.env.get("ROOT_URL");
  if (rootURL != undefined) {
    if (
      rootURL == undefined ||
      rootURL.length == 0 ||
      rootURL == "/"
    ) {
      rootURL = "";
    } else {
      if (rootURL[0] != "/") {
        rootURL = "/" + rootURL;
      }

      if (rootURL[-1] == "/") {
        rootURL = rootURL.substring(
          0,
          rootURL.length - 1,
        );
      }
    }
    config.rootURL = rootURL;
  } else {
    console.warn("No root URL specified... Using default root '/'");
    config.rootURL = "";
  }

  // Config DB URL
  let envDbURI = Deno.env.get("DB_URI");
  if (envDbURI != undefined) {
    config.dbURI = envDbURI;
  } else {
    console.error(
      "DB_URL not specified. If you are attempting to use DB_USER, DB_HOST, and the like, that is currently unsupported.",
    );
    failed = true;
    envDbURI = "";
  }

  // Get port from environment
  if (
    Deno.env.get("PORT") != undefined && !isNaN(Number(Deno.env.get("PORT"))) &&
    0 <= Number(Deno.env.get("PORT")) && Number(Deno.env.get("PORT")) <= 65535
  ) {
    config.port = Number(Deno.env.get("PORT"));
  } else if (Deno.env.get("PORT") == undefined) {
    console.warn("No port specified... Using default port 80.");
    config.port = 80;
  } else {
    failed = true;
    console.error(
      `Invalid port "${Deno.env.get("PORT")}" specified in environment.`,
    );
  }

  if (failed) {
    throw new Error("XepiError: Invalid Configuration");
  } else {
    return config;
  }
}
