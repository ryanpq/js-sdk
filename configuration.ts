/**
 * JavaScript and Node.js SDK for OpenFGA
 *
 * API version: 0.1
 * Website: https://openfga.dev
 * Documentation: https://openfga.dev/docs
 * Support: https://discord.gg/8naAwJfWN6
 * License: [Apache-2.0](https://github.com/openfga/js-sdk/blob/main/LICENSE)
 *
 * NOTE: This file was auto generated by OpenAPI Generator (https://openapi-generator.tech). DO NOT EDIT.
 */


import globalAxios, { AxiosInstance } from "axios";

import { ApiTokenConfig, AuthCredentialsConfig, ClientCredentialsConfig, CredentialsMethod } from "./credentials";
import { FgaValidationError, } from "./errors";
import { assertParamExists, isWellFormedUriString } from "./validation";

export interface RetryParams {
  maxRetry: number;
  minWaitInMs: number;
}

export interface UserConfigurationParams {
  apiScheme?: string;
  apiHost: string;
  storeId?: string;
  credentials?: CredentialsConfig;
  baseOptions?: any;
  retryParams?: RetryParams;
}

export function GetDefaultRetryParams (maxRetry = 3, minWaitInMs = 100) {
  return {
    maxRetry: maxRetry,
    minWaitInMs: minWaitInMs,
  };
}

interface BaseOptions {
  headers: Record<string, string>;
}

type CredentialsConfig =
  {
    method: CredentialsMethod.None | undefined;
  } | {
    method: CredentialsMethod.ApiToken;
    config: Pick<ApiTokenConfig, "token">;
  } | {
    method: CredentialsMethod.ClientCredentials;
    config: ClientCredentialsConfig;
  } | undefined;

export class Configuration {
  /**
   * Defines the version of the SDK
   *
   * @private
   * @type {string}
   * @memberof Configuration
   */
  private static sdkVersion = "0.2.0";

  /**
   * provide scheme (e.g. `https`)
   *
   * @type {string}
   * @memberof Configuration
   */
  apiScheme = "https";
  /**
   * provide server host (e.g. `api.fga.example`)
   *
   * @type {string}
   * @memberof Configuration
   */
  apiHost: string;
  /**
   * provide storeId
   *
   * @type {string}
   * @memberof Configuration
   */
  storeId: string;
  /**
   * base options for axios calls
   *
   * @type {any}
   * @memberof Configuration
   */
  baseOptions?: BaseOptions;
  /**
   * credentials configuration
   *
   * @type {AuthCredentialsConfig}
   * @memberof Configuration
   */
  credentials: AuthCredentialsConfig;
  /**
   * retry options in the case of too many requests
   *
   * @type {RetryParams}
   * @memberof Configuration
   */
  retryParams?: RetryParams;

  constructor(params: UserConfigurationParams = {} as unknown as UserConfigurationParams, private axios: AxiosInstance = globalAxios) {
    this.apiScheme = params.apiScheme || this.apiScheme;
    this.apiHost = params.apiHost!;
    this.storeId = params.storeId!;

    const credentialParams = params.credentials;

    if (credentialParams) {
      switch (credentialParams?.method) {
      case CredentialsMethod.ApiToken:
        this.credentials = {
          method: credentialParams.method,
          config: {
            token: credentialParams.config.token!,
            headerName: "Authorization",
            headerValuePrefix: "Bearer",
          }
        };
        break;
      case CredentialsMethod.ClientCredentials:
        this.credentials = {
          method: CredentialsMethod.ClientCredentials,
          config: {
            // We are only copying them from the passed in params here. We will be validating that they are valid in the Credentials constructor
            clientId: credentialParams.config.clientId,
            clientSecret: credentialParams.config.clientSecret,
            apiAudience: credentialParams.config.apiAudience,
            apiTokenIssuer: credentialParams.config.apiTokenIssuer,
          }
        };
        break;
      case CredentialsMethod.None:
      default:
        this.credentials = { method: CredentialsMethod.None };
        break;
      }
    }

    const baseOptions = params.baseOptions || {};
    baseOptions.headers = baseOptions.headers || {};

    if (typeof process === "object" && process.title === "node" && !baseOptions.headers["User-Agent"]) {
      baseOptions.headers["User-Agent"] = "openfga-sdk {sdkId}/{packageVersion}".replace("{sdkId}", "js").replace("{packageVersion}", Configuration.sdkVersion);
    }

    this.baseOptions = baseOptions;
    this.retryParams = params.retryParams;
  }

  /**
   *
   * @return {boolean}
   * @throws {FgaValidationError}
   */
  public isValid(): boolean {
    assertParamExists("Configuration", "apiScheme", this.apiScheme);
    assertParamExists("Configuration", "apiHost", this.apiHost);

    if (!isWellFormedUriString(this.getBasePath())) {
      throw new FgaValidationError(
        `Configuration.apiScheme (${this.apiScheme}) and Configuration.apiHost (${this.apiHost}) do not form a valid URI (${this.getBasePath()})`);
    }

    if (this.retryParams?.maxRetry && this.retryParams.maxRetry > 5) {
      throw new FgaValidationError("Configuration.retryParams.maxRetry exceeds maximum allowed limit of 5");
    }

    return true;
  }

  /**
   * Returns the API base path (apiScheme+apiHost)
   */
  public getBasePath: () => string = () => `${this.apiScheme}://${this.apiHost}`;

  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  public isJsonMime(mime: string): boolean {
    // eslint-disable-next-line no-control-regex
    const jsonMime = new RegExp("^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$", "i");
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
  }
}
