export type XepiConfig = {
  host: string;
  port: number;
  rootURL: string;
  options?: {
    serveWellKnown?: boolean;
  };
};
