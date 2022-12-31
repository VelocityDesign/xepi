import * as types from "./types.ts";

// TODO: Use x/@user@host for guesses, instead of x/@user

export function acctToSplitName(acctURI: string): types.SplitName {
  /** Converts a URI to a SplitName object */

  // Initialize the return variables
  let username: string;
  let host: string;

  // Check which schema the URI uses
  if (acctURI.startsWith("acct:") && acctURI.includes("@")) {
    // This uses the acct: schema, which we can definetly determine
    // See RFC 7565 (https://www.rfc-editor.org/rfc/rfc7565.html)

    acctURI = acctURI.slice(5);
    const parsedURI = acctURI.split("@");

    username = parsedURI[0];
    host = parsedURI[1];

    // TODO: Implement regex check to see if the username and host are valid.
    return new types.SplitName(username, host);
  } else if (acctURI.startsWith("http://") || acctURI.startsWith("https://")) {
    // The URI uses http or https, so we can make an educated guess at what the acct: will be.

    // Remove the protocol
    let parsedURI = acctURI.startsWith("http://")
      ? acctURI.substring(7)
      : acctURI.substring(8);
    let username: string;
    let host: string;

    // Remove a trailing '/' if present
    if (parsedURI[-1] == "/") {
      parsedURI = parsedURI.substring(0, parsedURI.length - 1);
    }

    // Split the URI into locations in a path
    const splitURI = parsedURI.split("/");

    if (
      splitURI[0] != undefined &&
      splitURI[splitURI.length - 1] != undefined
    ) {
      // We can guess that the host is the first string, and that the username is the last (but we can't know for sure)
      host = splitURI[0];
      username = splitURI[splitURI.length - 1];
    } else {
      throw new TypeError("Invalid String for Parsing");
    }

    // Remove a '@' at the beginning of the username if present.
    if (username.startsWith("@")) {
      username = username.substring(1);
    }

    // TODO: Implement regex check to see if the username and host are valid.
    return new types.SplitName(username, host);
  } else if (acctURI.includes("@")) {
    // The URI *could* be an acct: URI without the schema prefix. More accurate than http(s), but more prone to catching invalid URIs

    const parsedURI = acctURI.split("@");
    username = parsedURI[0];
    host = parsedURI[1];

    // TODO: Implement regex check to see if the username and host are valid.
    return new types.SplitName(username, host);
  } else {
    throw new Error("Invalid String for Parsing");
  }
}
