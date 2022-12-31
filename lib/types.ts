export type XepiConfig = {
  host: string;
  port: number;
  rootURL: string;
  dbURI: string;
  options?: {
    serveWellKnown?: boolean;
  };
};

export interface SplitName {
  username: string;
  host: string;
}

export class SplitName {
  constructor(user: string, host: string) {
    this.username = user;
    this.host = host;
  }
}
