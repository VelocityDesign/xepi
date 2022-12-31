export type XepiConfig = {
  host: string;
  port: number;
  rootURL: string;
  dbURI: string;
  options?: {
    serveWellKnown?: boolean;
  };
};
