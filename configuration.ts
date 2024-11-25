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


import { ApiTokenConfig, AuthCredentialsConfig, ClientCredentialsConfig, CredentialsMethod } from "./credentials/types";
import { FgaValidationError, } from "./errors";
import { assertParamExists, isWellFormedUlidString, isWellFormedUriString } from "./validation";
import { TelemetryConfig, TelemetryConfiguration } from "./telemetry/configuration";

// default maximum number of retry
const DEFAULT_MAX_RETRY = 15;

// default minimum wait period in retry - but will backoff exponentially
const DEFAULT_MIN_WAIT_MS = 100;

const DEFAULT_USER_AGENT = "openfga-sdk js/0.7.0";

export interface RetryParams {
  maxRetry?: number;
  minWaitInMs?: number;
}

export interface UserConfigurationParams {
  apiUrl?: string;
  /**
   * @deprecated Replace usage of `apiScheme` + `apiHost` with `apiUrl`
   */
  apiScheme?: string;
  /**
   * @deprecated Replace usage of `apiScheme` + `apiHost` with `apiUrl`
   */
  apiHost?: string;
  credentials?: CredentialsConfig;
  baseOptions?: any;
  retryParams?: RetryParams;
  telemetry?: TelemetryConfig;
}

export function GetDefaultRetryParams (maxRetry = DEFAULT_MAX_RETRY, minWaitInMs = DEFAULT_MIN_WAIT_MS) {
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
  private static sdkVersion = "0.7.0";

  /**
   * provide the full api URL (e.g. `https://api.fga.example`)
   *
   * @type {string}
   * @memberof Configuration
   */
  apiUrl: string;

  /**
   * provide scheme (e.g. `https`)
   *
   * @type {string}
   * @memberof Configuration
   * @deprecated
   */
  apiScheme = "https";
  /**
   * provide server host (e.g. `api.fga.example`)
   *
   * @type {string}
   * @memberof Configuration
   * @deprecated
   */
  apiHost: string;
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
  /**
   * telemetry configuration
   *
   * @type {TelemetryConfiguration}
   * @memberof Configuration
   */
  telemetry: TelemetryConfiguration;

  constructor(params: UserConfigurationParams = {} as unknown as UserConfigurationParams) {
    this.apiScheme = params.apiScheme || this.apiScheme;
    this.apiHost = params.apiHost!;
    this.apiUrl = params.apiUrl!;

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
      baseOptions.headers["User-Agent"] = DEFAULT_USER_AGENT;
    }

    this.baseOptions = baseOptions;
    this.retryParams = params.retryParams;
    this.telemetry = new TelemetryConfiguration(params?.telemetry?.metrics);
  }

  /**
   *
   * @return {boolean}
   * @throws {FgaValidationError}
   */
  public isValid(): boolean {
    if (!this.apiUrl && !this.apiHost) {
      assertParamExists("Configuration", "apiUrl", this.apiUrl);
    }

    if (!isWellFormedUriString(this.getBasePath())) {
      throw new FgaValidationError(
        this.apiUrl ?
          `Configuration.apiUrl (${this.apiUrl}) is not a valid URI (${this.getBasePath()})` :
          `Configuration.apiScheme (${this.apiScheme}) and Configuration.apiHost (${this.apiHost}) do not form a valid URI (${this.getBasePath()})`
      );
    }

    if (this.retryParams?.maxRetry && this.retryParams.maxRetry > 15) {
      throw new FgaValidationError("Configuration.retryParams.maxRetry exceeds maximum allowed limit of 15");
    }

    this.telemetry.ensureValid();

    return true;
  }

  /**
   * Returns the API base path (apiScheme+apiHost)
   */
  public getBasePath: () => string = () => {
    if (this.apiUrl) {
      return this.apiUrl;
    } else {
      return `${this.apiScheme}://${this.apiHost}`;
    }
  };
}
