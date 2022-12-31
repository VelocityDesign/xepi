import {
  Database,
  DataTypes,
  Model,
  PostgresConnector,
} from "https://deno.land/x/denodb/mod.ts";
import * as Models from "../lib/models.ts";

export async function setupDB(connectionString: string) {
  // Connect to the database
  const connection = new PostgresConnector({
    uri: connectionString,
  });

  const db = new Database(connection);

  await db.sync(Models);
  return db;
}
