/**
 * JavaScript and Node.js SDK for OpenFGA
 *
 * API version: 1.x
 * Website: https://openfga.dev
 * Documentation: https://openfga.dev/docs
 * Support: https://openfga.dev/community
 * License: [Apache-2.0](https://github.com/openfga/js-sdk/blob/main/LICENSE)
 *
 * NOTE: This file was auto generated by OpenAPI Generator (https://openapi-generator.tech). DO NOT EDIT.
 */


export interface TelemetryHistogram {
  name: string;
  unit: string;
  description: string;
}

export class TelemetryHistograms {
  static requestDuration: TelemetryHistogram = {
    name: "fga-client.request.duration",
    unit: "milliseconds",
    description: "How long it took for a request to be fulfilled.",
  };

  static queryDuration: TelemetryHistogram = {
    name: "fga-client.query.duration",
    unit: "milliseconds",
    description: "How long it took to perform a query request.",
  };
}
