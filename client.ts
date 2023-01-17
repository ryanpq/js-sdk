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

import { AxiosResponse, AxiosStatic } from "axios";

import { OpenFgaApi } from "./api";
import {
  AuthorizationModel,
  CreateStoreRequest,
  CreateStoreResponse,
  ExpandResponse,
  ListStoresResponse,
  TupleKey as ApiTupleKey,
  CheckResponse,
  ReadAuthorizationModelResponse,
  ReadAuthorizationModelsResponse,
  GetStoreResponse,
  WriteAuthorizationModelResponse,
  WriteAuthorizationModelRequest,
  ListObjectsResponse,
  ListObjectsRequest,
  ReadResponse,
  WriteAssertionsRequest,
  ReadAssertionsResponse,
  ReadChangesResponse,
} from "./apiModel";
import { BaseAPI } from "./base";
import { CallResult, PromiseResult } from "./common";
import { Configuration, UserConfigurationParams } from "./configuration";
import { FgaValidationError } from "./errors";
import { chunkSequentialCall, setNotEnumerableProperty } from "./utils";

export type OpenFgaClientConfig = (UserConfigurationParams | Configuration) & {
  authorizationModelId?: string;
}

type TupleKey = Required<ApiTupleKey>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RetryOpts {
}

const DEFAULT_MAX_METHOD_PARALLEL_REQS = 10;

export interface ClientRequestOpts {
  retry?: RetryOpts;
}

export interface AuthorizationModelIdOpts {
  authorization_model_id?: string;
}

export type ClientRequestOptsWithAuthZModelId = ClientRequestOpts  & AuthorizationModelIdOpts;

export type PaginationOptions = { pageSize?: number, continuationToken?: string; };

export type ClientCheckRequest = TupleKey & { contextual_tuples?: TupleKey[] };

export type ClientBatchCheckRequest = ClientCheckRequest[];

export type ClientBatchCheckSingleResponse = {
  _request: ClientCheckRequest;
} & ({
  allowed: boolean;
  _response: AxiosResponse<CheckResponse>;
} | {
  allowed: undefined;
  error: Error;
});

export type ClientBatchCheckResponse = ClientBatchCheckSingleResponse[]

export interface ClientWriteRequestOpts {
  transaction?: {
    disable?: boolean;
    maxPerChunk?: number;
  }
}

export interface ClientWriteRequest {
  writes?: TupleKey[];
  deletes?: TupleKey[];
}

export enum ClientWriteStatus {
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface ClientWriteResponse {
  writes: { tuple_key: TupleKey, status: ClientWriteStatus }[];
  deletes: { tuple_key: TupleKey, status: ClientWriteStatus }[];
}

export interface ClientListRelationsResponse {
  relations: string[];
}

export interface ClientReadChangesRequest {
  type: string;
}

export type ClientExpandRequest = Pick<TupleKey, "relation" | "object">;
export type ClientReadRequest = ApiTupleKey;
export type ClientListObjectsRequest = Omit<ListObjectsRequest, "authorization_model_id" | "contextual_tuples"> & { contextual_tuples?: TupleKey[] };
export type ClientListRelationsRequest = Pick<TupleKey, "user" | "object"> & { relations?: string[] };
export type ClientWriteAssertionsRequest = WriteAssertionsRequest["assertions"];

function getObjectFromString(objectString: string): { type: string; id: string } {
  const [type, id] = objectString.split(":");
  return { type, id };
}

export class OpenFgaClient extends BaseAPI {
  public openFgaApi: OpenFgaApi;
  public authorizationModelId?: string;

  constructor(configuration: OpenFgaClientConfig, protected axios?: AxiosStatic) {
    super(configuration, axios);

    this.openFgaApi = new OpenFgaApi(this.configuration);
    this.authorizationModelId = configuration.authorizationModelId;
  }

  private getAuthorizationModelId(options: AuthorizationModelIdOpts = {}) {
    return options?.authorization_model_id || this.authorizationModelId;
  }

  /********** 
   * Stores *
   **********/

  /**
   * ListStores - Returns a paginated list of OpenFGA stores.
   * @summary List all stores
   * @param {object} paginationOptions
   * @param {number} [paginationOptions.pageSize]
   * @param {string} [paginationOptions.continuationToken]
   * @param {*} [options] Override http request option.
   * @throws { FgaError }
   */
  async listStores(options: ClientRequestOptsWithAuthZModelId & PaginationOptions = {}): PromiseResult<ListStoresResponse> {
    return this.openFgaApi.listStores(options.pageSize, options.continuationToken, options);
  }
  
  /**
   * CreateStore - Initializes a store
   * @param body
   * @param options
   */
  async createStore(body: CreateStoreRequest, options: ClientRequestOpts = {}): PromiseResult<CreateStoreResponse> {
    return this.openFgaApi.createStore(body, options);
  }

  /**
   * GetStore - Returns the current store
   * @param options
   */
  async getStore(options: ClientRequestOpts = {}): PromiseResult<GetStoreResponse> {
    return this.openFgaApi.getStore(options);
  }

  /**
   * DeleteStore - Deletes a store
   * @param options
   */
  async deleteStore(options: ClientRequestOpts = {}): PromiseResult<void> {
    return this.openFgaApi.deleteStore(options);
  }
  
  /************************
   * Authorization Models *
   ************************/

  /**
   * ReadAuthorizationModels - Reads all authorization models
   * @param options
   */
  async readAuthorizationModels(options: ClientRequestOpts = {}): PromiseResult<ReadAuthorizationModelsResponse> {
    return this.openFgaApi.readAuthorizationModels();
  }

  /**
   * WriteAuthorizationModel - Creates a new version of the authorization model
   * @param body
   * @param options
   */
  async writeAuthorizationModel(body: WriteAuthorizationModelRequest, options: ClientRequestOpts = {}): PromiseResult<WriteAuthorizationModelResponse> {
    return this.openFgaApi.writeAuthorizationModel(body, options);
  }

  /**
   * ReadAuthorizationModel - Read the current authorization model
   * @param options
   */
  async readAuthorizationModel(options: ClientRequestOptsWithAuthZModelId = {}): PromiseResult<ReadAuthorizationModelResponse> {
    const authorizationModelId = this.getAuthorizationModelId(options);
    if (!authorizationModelId) {
      throw new Error("authorization_model_id_required");
    }
    return this.openFgaApi.readAuthorizationModel(authorizationModelId);
  }

  /**
   * ReadLatestAuthorizationModel - Reads the latest authorization model for the current store
   * @param options
   */
  async readLatestAuthorizationModel(options: ClientRequestOpts = {}): PromiseResult<ReadAuthorizationModelResponse> {
    const authorizationModelsResponse = await this.readAuthorizationModels(options);
    const response = authorizationModelsResponse as any as CallResult<ReadAuthorizationModelResponse>;
    response.authorization_model = authorizationModelsResponse.authorization_models?.[0];
    delete (response as any).authorization_models;
    return response;
  }

  /***********************
   * Relationship Tuples *
   ***********************/

  /**
   * Read Changes - Reads the list of historical tuple writes and deletes
   * @param clientReadChangesRequest
   * @param {object} paginationOptions
   * @param {number} [paginationOptions.pageSize]
   * @param {string} [paginationOptions.continuationToken]
   * @param options
   */
  async readChanges(clientReadChangesRequest: ClientReadChangesRequest, options: ClientRequestOptsWithAuthZModelId & PaginationOptions = {}): PromiseResult<ReadChangesResponse> {
    return this.openFgaApi.readChanges(clientReadChangesRequest.type, options.pageSize, options.continuationToken, options);
  }

  /**
   * Read - Reads tuples previously written to the store (does not evaluate)
   * @param clientReadRequest
   * @param options
   */
  async read(clientReadRequest: ClientReadRequest, options: ClientRequestOpts = {}): PromiseResult<ReadResponse> {
    return this.openFgaApi.read({ tuple_key: clientReadRequest }, options);
  }

  /**
   * Write - Create or delete relationship tuples
   * @param {object} body
   * @param {objects} options
   */
  async write(body: ClientWriteRequest, options: ClientRequestOptsWithAuthZModelId & ClientWriteRequestOpts = {}): Promise<ClientWriteResponse> {
    const { transaction = {} } = options;
    const { writes, deletes } = body;
    const authorizationModelId = this.getAuthorizationModelId(options);

    if (!transaction?.disable) {
      await this.openFgaApi.write({
        writes: { tuple_keys: writes || [] },
        deletes: { tuple_keys: deletes || [] },
        authorization_model_id: authorizationModelId,
      }, options);
      return {
        writes: writes?.map(tuple => ({
          tuple_key: tuple,
          status: ClientWriteStatus.SUCCESS,
        })) || [],
        deletes: deletes?.map(tuple => ({
          tuple_key: tuple,
          status: ClientWriteStatus.SUCCESS,
        })) || []
      };
    }

    const results: ClientWriteResponse = { writes: [], deletes: [] };
    await chunkSequentialCall<TupleKey, void>(
      (chunk) => this.openFgaApi.write({ writes: { tuple_keys: chunk}, authorization_model_id: authorizationModelId })
        .then(() => { results.writes.push(...chunk.map(tuple => ({ tuple_key: tuple, status: ClientWriteStatus.SUCCESS }))); })
        .catch(() => { results.writes.push(...chunk.map(tuple => ({ tuple_key: tuple, status: ClientWriteStatus.FAILURE }))); }),
      writes || [],
      transaction.maxPerChunk || DEFAULT_MAX_METHOD_PARALLEL_REQS,
    );
    await chunkSequentialCall<TupleKey, void>(
      (chunk) => this.openFgaApi.write({ deletes: { tuple_keys: chunk }, authorization_model_id: authorizationModelId })
        .then(() => { results.deletes.push(...chunk.map(tuple => ({ tuple_key: tuple, status: ClientWriteStatus.SUCCESS }))); })
        .catch(() => { results.deletes.push(...chunk.map(tuple => ({ tuple_key: tuple, status: ClientWriteStatus.FAILURE }))); }),
      deletes || [],
      transaction.maxPerChunk || DEFAULT_MAX_METHOD_PARALLEL_REQS,
    );

    return results;
  }

  /**
   * WriteTuples - Utility method to write tuples, wraps Write
   * @param tuples
   * @param options
   */
  async writeTuples(tuples: TupleKey[], options: ClientRequestOptsWithAuthZModelId & ClientWriteRequestOpts = {}): Promise<ClientWriteResponse> {
    return this.write({ writes: tuples }, options);
  }
  
  /**
   * DeleteTuples - Utility method to delete tuples, wraps Write
   * @param tuples
   * @param options
   */
  async deleteTuples(tuples: TupleKey[], options: ClientRequestOptsWithAuthZModelId & ClientWriteRequestOpts = {}): Promise<ClientWriteResponse> {
    return this.write({ deletes: tuples }, options);
  }
  
  /************************ 
   * Relationship Queries *
   ************************/
  
  /**
   * Check - Check if a user has a particular relation with an object (evaluates)
   * @param checkRequest
   * @param options
   */
  async check(checkRequest: ClientCheckRequest, options: ClientRequestOptsWithAuthZModelId = {}): PromiseResult<CheckResponse> {
    return this.openFgaApi.check({
      tuple_key: {
        user: checkRequest.user,
        relation: checkRequest.relation,
        object: checkRequest.object,
      },
      contextual_tuples: { tuple_keys: checkRequest.contextual_tuples || [] },
      authorization_model_id: this.getAuthorizationModelId(options)
    }).then(response => ({
      ...response,
      allowed: response.allowed || false,
    }));
  }
  
  /**
   * BatchCheck - Run a set of checks (evaluates)
   * @param batchCheckRequest
   * @param options
   */
  async batchCheck(batchCheckRequest: ClientBatchCheckRequest, options: ClientRequestOptsWithAuthZModelId = {}): Promise<ClientBatchCheckResponse> {
    return chunkSequentialCall<TupleKey, any>(async (tuples) => 
      Promise.all(tuples.map(tuple => this.check(tuple, options)
        .then(({ allowed, $response: response }) => {
          const result = {
            allowed: allowed || false,
            _request: tuple,
          };
          setNotEnumerableProperty(result, "$response", response);
          return result;
        })
        .catch(err => ({
          error: err,
          _request: tuple,
        }))
      )), batchCheckRequest, DEFAULT_MAX_METHOD_PARALLEL_REQS).then(results => results.flat());
  }

  /**
   * Expand - Expands the leaves that have a particular relation to an object (evaluates)
   * @param expandRequest
   * @param {string} expandRequest.relation The relation
   * @param {string} expandRequest.object The object, must be of the form: `<type>:<id>`
   * @param options
   */
  async expand(expandRequest: ClientExpandRequest, options: ClientRequestOptsWithAuthZModelId = {}): PromiseResult<ExpandResponse> {
    return this.openFgaApi.expand({
      authorization_model_id: this.getAuthorizationModelId(options),
      tuple_key: expandRequest,
    });
  }

  /**
   * ListObjects - List the objects of a particular type that the user has a certain relation to (evaluates)
   * @param listObjectsRequest
   * @param options
   */
  async listObjects(listObjectsRequest: ClientListObjectsRequest, options: ClientRequestOptsWithAuthZModelId = {}): PromiseResult<ListObjectsResponse> {
    const authorizationModelId = this.getAuthorizationModelId(options);
    return this.openFgaApi.listObjects({
      authorization_model_id: authorizationModelId,
      user: listObjectsRequest.user,
      relation: listObjectsRequest.relation,
      type: listObjectsRequest.type,
      contextual_tuples: { tuple_keys: listObjectsRequest.contextual_tuples || [] },
    }, options);
  }

  /**
   * ListRelations - Lists all the relations a user has with an object (evaluates)
   * @param {object} listRelationsRequest
   * @param {string} listRelationsRequest.user The user object, must be of the form: `<type>:<id>`
   * @param {string} listRelationsRequest.object The object, must be of the form: `<type>:<id>`
   * @param {string[]} [listRelationsRequest.relations] The list of relations to check, if not sent default to the all those for that type int the model
   * @param options
   */
  async listRelations(listRelationsRequest: ClientListRelationsRequest, options: ClientRequestOptsWithAuthZModelId = {}): Promise<ClientListRelationsResponse> {
    const { user, object } = listRelationsRequest;
    let { relations } = listRelationsRequest;
    
    // 1- Get the list of relations on that object type
    // 2- Filter out/error out on invalid relations
    // 2- Call check in batch
    const authorizationModel: AuthorizationModel | undefined = this.getAuthorizationModelId(options) ?
      (await this.readAuthorizationModel(options))?.authorization_model : (await this.readLatestAuthorizationModel(options))?.authorization_model;

    if (!authorizationModel) {
      throw new Error("authorization_model_not_found");
    }

    const { type: objectType } = getObjectFromString(object);
    const availableRelations = Object.keys(authorizationModel?.type_definitions?.find(typeDef => typeDef.type === objectType)?.relations || {});

    if (!relations) {
      relations = availableRelations;
    }

    if (relations.some(relation => !availableRelations.includes(relation))) {
      throw new FgaValidationError("relations", "Not all requested relations are available on this object type");
    }

    const batchCheckResults = await this.batchCheck(relations.map(relation => ({
      user,
      relation,
      object
    })), options);

    return { relations: batchCheckResults.filter(result => result.allowed).map(result => result._request.relation) };
  }
  
  /************** 
   * Assertions *
   **************/

  /**
   * ReadAssertions - Reads assertions for a particular authorization model
   * @param options
   */
  async readAssertions(options: ClientRequestOptsWithAuthZModelId = {}): PromiseResult<ReadAssertionsResponse> {
    const authorizationModelId = this.getAuthorizationModelId(options);
    // Note: authorization model id is validated later
    return this.openFgaApi.readAssertions(authorizationModelId!, options);
  }

  /**
   * WriteAssertions - Updates assertions for a particular authorization model
   * @param {array} assertions
   * @param {object} assertions.tuple_key
   * @param {string} assertions.tuple_key.user
   * @param {string} assertions.tuple_key.relation
   * @param {string} assertions.tuple_key.object
   * @param {boolean} assertions.expectation
   * @param {object} options
   */
  async writeAssertions(assertions: ClientWriteAssertionsRequest, options: ClientRequestOptsWithAuthZModelId = {}): PromiseResult<void> {
    const authorizationModelId = this.getAuthorizationModelId(options);
    // Note: authorization model id is validated later
    return this.openFgaApi.writeAssertions(authorizationModelId!, { assertions }, options);
  }
}
