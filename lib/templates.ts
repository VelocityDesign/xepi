import { getReasonPhrase } from "https://esm.sh/http-status-codes@2.2.0";
export class ErrorPage {
  constructor(status: number, description?: string, error?: Error) {
    if (description || error) {
      if (description && error) {
        throw Error("Unable to parse both description & error object");
      }
      if (description) {
        return `
                <h1>${status} ${getReasonPhrase(status)}</h1>
                <h2>${description}</h2>
                <hr>
                <p>xepi</p>
                <style>
                  h1,h2,p {
                    text-align: center;
                  }
                </style>
                `;
      } else if (error) {
        return `
                <h1>${status} ${getReasonPhrase(status)}</h1>
                <h2>${error.message}</h2>
                <hr>
                <p>xepi</p>
                <style>
                  h1,h2,p {
                    text-align: center;
                  }
                </style>
                `;
      }
    } else {
      return `
                <h1>${status} ${getReasonPhrase(status)}</h1>
                <hr>
                <p>xepi</p>
                <style>
                  h1,h2,p {
                    text-align: center;
                  }
                </style>
                `;
    }
  }
}
