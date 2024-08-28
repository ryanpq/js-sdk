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


import * as nock from "nock";

import {
  ClientWriteStatus,
  CredentialsMethod,
  FgaApiError,
  FgaApiAuthenticationError,
  FgaValidationError,
  OpenFgaClient,
  ListUsersResponse,
  ConsistencyPreference,
} from "../index";
import { baseConfig, defaultConfiguration, getNocks } from "./helpers";

const nocks = getNocks(nock);
nock.disableNetConnect();

describe("OpenFGA Client", () => {

  describe("Using the OpenFGA Client", () => {
    let fgaClient: OpenFgaClient;

    beforeAll(() => {
      fgaClient = new OpenFgaClient({ ...baseConfig, credentials: { method: CredentialsMethod.None } });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    describe("Configuration", () => {
      it("should throw an error if the storeId is not in a valid format", async () => {
        expect(
          () => new OpenFgaClient({ ...baseConfig, storeId: "abcsa"! })
        ).toThrowError(FgaValidationError);
      });

      it("should require storeId when calling endpoints that require it", () => {
        const fgaClient = new OpenFgaClient({ ...baseConfig, storeId: undefined!, credentials: undefined! });
        expect(
          fgaClient.readAuthorizationModels()
        ).rejects.toThrow();
      });

      it("should accept the store and model IDs on initialization", async () => {
        const fgaClient = new OpenFgaClient({
          apiUrl: defaultConfiguration.apiUrl,
          storeId: defaultConfiguration.storeId,
          authorizationModelId: defaultConfiguration.authorizationModelId,
        });
        expect(fgaClient.storeId).toBe(defaultConfiguration.storeId);
        expect(fgaClient.authorizationModelId).toBe(defaultConfiguration.authorizationModelId);
      });

      it("should allow updating the storeId after initialization", async () => {
        const fgaClient = new OpenFgaClient({
          apiUrl: defaultConfiguration.apiUrl
        });
        expect(fgaClient.storeId).toBe(undefined);
        fgaClient.storeId = defaultConfiguration.storeId;
        expect(fgaClient.storeId).toBe(defaultConfiguration.storeId);
      });

      it("should allow updating the authorizationModelId after initialization", async () => {
        const fgaClient = new OpenFgaClient({
          apiUrl: defaultConfiguration.apiUrl,
          storeId: defaultConfiguration.storeId,
        });
        expect(fgaClient.authorizationModelId).toBe(undefined);
        fgaClient.authorizationModelId = defaultConfiguration.authorizationModelId;
        expect(fgaClient.authorizationModelId).toBe(defaultConfiguration.authorizationModelId);
      });
    });


    /* Stores */

    describe("ListStores", () => {
      it("should properly call the ListStores API", async () => {
        const store = { id: "some-id", name: "some-name" };
        const scope = nocks.listStores(defaultConfiguration.getBasePath(), {
          continuation_token: "",
          stores: [{
            ...store,
            created_at: "2023-11-02T15:27:47.951Z",
            updated_at: "2023-11-02T15:27:47.951Z",
            deleted_at: "2023-11-02T15:27:47.951Z",
          }],
        });

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.listStores();

        expect(scope.isDone()).toBe(true);
        expect(response.stores).toHaveLength(1);
        expect(response.stores?.[0]).toMatchObject(store);
      });
    });

    describe("CreateStore", () => {
      it("should create a store", async () => {
        const store = { id: "some-id", name: "some-name" };
        const scope = nocks.createStore(defaultConfiguration.getBasePath(), {
          ...store,
          created_at: "2023-11-02T15:27:47.951Z",
          updated_at: "2023-11-02T15:27:47.951Z",
        });

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.createStore(store);

        expect(scope.isDone()).toBe(true);
        expect(response).toMatchObject(store);
      });
    });

    describe("GetStore", () => {
      it("should properly call the GetStore API", async () => {
        const store = { id: defaultConfiguration.storeId!, name: "some-name" };
        const scope = nocks.getStore(store.id, defaultConfiguration.getBasePath(), {
          ...store,
          created_at: "2023-11-02T15:27:47.951Z",
          updated_at: "2023-11-02T15:27:47.951Z",
        });

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.getStore();

        expect(scope.isDone()).toBe(true);
        expect(response).toMatchObject(store);
      });



      it("should allow overriding the store ID", async () => {
        const overriddenStoreId = "01HWD53SDGYRXHBXTYA10PF6T4";

        const store = { id: overriddenStoreId, name: "some-name" };
        const scope = nocks.getStore(store.id, defaultConfiguration.getBasePath(), {
          ...store,
          created_at: "2023-11-02T15:27:47.951Z",
          updated_at: "2023-11-02T15:27:47.951Z",
        });

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.getStore({ storeId: overriddenStoreId });

        expect(scope.isDone()).toBe(true);
        expect(response).toMatchObject(store);
      });
    });

    describe("DeleteStore", () => {
      it("should properly call the DeleteStore API", async () => {
        const scope = nocks.deleteStore(defaultConfiguration.storeId!);

        expect(scope.isDone()).toBe(false);
        await fgaClient.deleteStore();

        expect(scope.isDone()).toBe(true);
      });
    });

    /* Authorization Models */
    describe("ReadAuthorizationModels", () => {
      it("should properly call the ReadAuthorizationModels API", async () => {
        const scope = nocks.readAuthorizationModels(defaultConfiguration.storeId!);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.readAuthorizationModels();

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({
          authorization_models: expect.arrayContaining([]),
        });
      });
    });

    describe("WriteAuthorizationModel", () => {
      it("should properly call the WriteAuthorizationModel API", async () => {
        const authorizationModel = {
          schema_version: "1.1",
          type_definitions: [
            { type: "workspace", relations: { admin: { this: {} } } },
          ],
        };
        const scope = nocks.writeAuthorizationModel(
          baseConfig.storeId!,
          authorizationModel
        );

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.writeAuthorizationModel(
          authorizationModel
        );

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({ id: expect.any(String) });
      });
    });

    describe("ReadAuthorizationModel", () => {
      it("should properly call the ReadAuthorizationModel API", async () => {
        const modelId = "01H0THVNGCSAZ6SAQVTHPH3F0Q";
        const scope = nocks.readSingleAuthzModel(defaultConfiguration.storeId!, modelId);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.readAuthorizationModel({ authorizationModelId: modelId });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({
          authorization_model: {
            id: expect.any(String),
            schema_version: "1.1",
            type_definitions: expect.arrayContaining([]),
          },
        });
      });
    });

    describe("ReadLatestAuthorizationModel", () => {
      it("should properly call the ReadLatestAuthorizationModel API", async () => {
        const modelId = "01H0THVNGCSAZ6SAQVTHPH3F0Q";
        const scope = nock(defaultConfiguration.getBasePath())
          .get(`/stores/${defaultConfiguration.storeId!}/authorization-models`)
          .query({ page_size: 1 })
          .reply(200, {
            authorization_models: [{ id: modelId, schema_version: "1.1", type_definitions: [] }],
          });

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.readLatestAuthorizationModel();

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({
          authorization_model: {
            id: expect.any(String),
            schema_version: "1.1",
            type_definitions: expect.arrayContaining([]),
          },
        });
      });
    });

    /* Relationship Tuples */
    describe("ReadChanges", () => {
      it("should properly call the ReadChanges API", async () => {
        const type = "repo";
        const pageSize = 25;
        const continuationToken = "eyJwayI6IkxBVEVTVF9OU0NPTkZJR19hdXRoMHN0b3JlIiwic2siOiIxem1qbXF3MWZLZExTcUoyN01MdTdqTjh0cWgifQ==";

        const scope = nocks.readChanges(baseConfig.storeId!, type, pageSize, continuationToken);

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.readChanges({ type }, { pageSize, continuationToken });

        expect(scope.isDone()).toBe(true);
        expect(response).toMatchObject({ changes: expect.arrayContaining([]) });
      });

      it("should properly call the ReadChanges API with no type", async () => {
        const pageSize = 25;
        const continuationToken = "eyJwayI6IkxBVEVTVF9OU0NPTkZJR19hdXRoMHN0b3JlIiwic2siOiIxem1qbXF3MWZLZExTcUoyN01MdTdqTjh0cWgifQ==";

        const scope = nocks.readChanges(baseConfig.storeId!, "", pageSize, continuationToken);

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.readChanges(undefined, { pageSize, continuationToken });

        expect(scope.isDone()).toBe(true);
        expect(response).toMatchObject({ changes: expect.arrayContaining([]) });
      });
    });

    describe("Read", () => {
      it("should properly call the Read API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.read(baseConfig.storeId!, tuple, undefined, ConsistencyPreference.HigherConsistency);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.read(tuple, { consistency: ConsistencyPreference.HigherConsistency});

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });
    });

    describe("Write", () => {
      it("should properly call the Write API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.write(baseConfig.storeId!);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.write({
          writes: [tuple],
        }, {
          authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
        });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });

      it("should properly chunk the calls when called in non-transaction mode", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:2",
        }];
        const scope0 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");
        const scope1 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");
        const scope2 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");
        const modelId = "01GXSA8YR785C4FYS3C0RTG7B1";
        const scope3 = nocks.readSingleAuthzModel(defaultConfiguration.storeId!, modelId);

        expect(scope0.isDone()).toBe(false);
        expect(scope1.isDone()).toBe(false);
        expect(scope2.isDone()).toBe(false);
        const data = await fgaClient.write({
          writes: tuples,
        }, {
          authorizationModelId: modelId,
          transaction: { disable: true },
        });

        expect(scope0.isDone()).toBe(true);
        expect(scope1.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(false);
        expect(scope3.isDone()).toBe(false);
        expect(data).toMatchObject({});
      });

      it("should not fail the request on errors in non-transaction mode", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:2",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "reader",
          object: "workspace:3",
        }];
        const scope0 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");
        const scope1 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");
        const scope2 = nocks.write(baseConfig.storeId!, defaultConfiguration.getBasePath(), {
          "code": "validation_error",
          "message": "relation &#39;workspace#reader&#39; not found"
        }, 400).matchHeader("X-OpenFGA-Client-Method", "Write");
        const modelId = "01GXSA8YR785C4FYS3C0RTG7B1";
        const scope3 = nocks.readSingleAuthzModel(defaultConfiguration.storeId!, modelId);

        expect(scope0.isDone()).toBe(false);
        expect(scope1.isDone()).toBe(false);
        expect(scope2.isDone()).toBe(false);
        const data = await fgaClient.write({
          writes: tuples,
        }, {
          authorizationModelId: modelId,
          transaction: { disable: true },
        });

        expect(scope0.isDone()).toBe(true);
        expect(scope1.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(true);
        expect(scope3.isDone()).toBe(false);
        expect(data.writes.length).toBe(3);
        expect(data.deletes.length).toBe(0);
        expect(data.writes.find(tuple => tuple.tuple_key.object === tuples[0].object)?.status).toBe(ClientWriteStatus.SUCCESS);
        expect(data.writes.find(tuple => tuple.tuple_key.object === tuples[1].object)?.status).toBe(ClientWriteStatus.SUCCESS);
        expect(data.writes.find(tuple => tuple.tuple_key.object === tuples[2].object)?.status).toBe(ClientWriteStatus.FAILURE);
      });

      it("should throw an error if auth fails in not transaction mode", async () => {
        const authModelId = "01GXSA8YR785C4FYS3C0RTG7B1";
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }];

        const scope0 = nocks.write(baseConfig.storeId!, defaultConfiguration.getBasePath(), {}, 401).matchHeader("X-OpenFGA-Client-Method", "Write");
        const scope1 = nock(defaultConfiguration.getBasePath())
          .get(`/stores/${baseConfig.storeId!}/authorization-models/${authModelId}`)
          .reply(401, {});
        try {
          const tuples = [{
            user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
            relation: "admin",
            object: "workspace:1",
          }];
          await fgaClient.write({
            writes: tuples,
          }, {
            authorizationModelId: authModelId,
            transaction: { disable: true },
          });
        } catch (err) {
          expect(err).toBeInstanceOf(FgaApiAuthenticationError);
        } finally {
          expect(scope0.isDone()).toBe(true);
          expect(scope1.isDone()).toBe(false);
        }
      });

      it("should properly call the Write API when providing one empty array", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.write(baseConfig.storeId!);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.write({
          writes: [tuple],
          deletes: []
        }, {
          authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
        });

        expect(scope.isDone()).toBe(true);
        expect(data.writes.length).toBe(1);
        expect(data.deletes.length).toBe(0);
      });
    });

    describe("WriteTuples", () => {
      it("should properly call the Write API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.write(baseConfig.storeId!);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.writeTuples([tuple], {
          authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
        });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });
    });

    describe("DeleteTuples", () => {
      it("should properly call the Write API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.write(baseConfig.storeId!);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.deleteTuples([tuple], {
          authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
        });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });
    });

    /* Relationship Queries */
    describe("Check", () => {
      it("should properly call the Check API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.check(baseConfig.storeId!, tuple, undefined, undefined, undefined, ConsistencyPreference.HigherConsistency);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.check(tuple, { consistency: ConsistencyPreference.HigherConsistency });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({ allowed: expect.any(Boolean) });
      });
    });

    describe("BatchCheck", () => {
      it("should properly call the Check API", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "guest",
          object: "workspace:2",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "reader",
          object: "workspace:3",
        }];
        const scope0 = nocks.check(defaultConfiguration.storeId!, tuples[0], defaultConfiguration.getBasePath(), { allowed: true }, 200, ConsistencyPreference.HigherConsistency).matchHeader("X-OpenFGA-Client-Method", "BatchCheck");
        const scope1 = nocks.check(defaultConfiguration.storeId!, tuples[1], defaultConfiguration.getBasePath(), { allowed: false }, 200, ConsistencyPreference.HigherConsistency).matchHeader("X-OpenFGA-Client-Method", "BatchCheck");
        const scope2 = nocks.check(defaultConfiguration.storeId!, tuples[2], defaultConfiguration.getBasePath(), {
          "code": "validation_error",
          "message": "relation &#39;workspace#reader&#39; not found"
        }, 400, ConsistencyPreference.HigherConsistency).matchHeader("X-OpenFGA-Client-Method", "BatchCheck");
        const scope3 = nock(defaultConfiguration.getBasePath())
          .get(`/stores/${defaultConfiguration.storeId!}/authorization-models`)
          .query({ page_size: 1 })
          .reply(200, {
            authorization_models: [],
          });

        expect(scope0.isDone()).toBe(false);
        expect(scope1.isDone()).toBe(false);
        expect(scope2.isDone()).toBe(false);
        const response = await fgaClient.batchCheck([tuples[0], tuples[1], tuples[2]], { consistency: ConsistencyPreference.HigherConsistency });

        expect(scope0.isDone()).toBe(true);
        expect(scope1.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(true);
        expect(scope3.isDone()).toBe(false);
        expect(response.responses.length).toBe(3);
        expect(response.responses.sort((a, b) => String(a._request.object).localeCompare(b._request.object)))
          .toMatchObject(expect.arrayContaining([
            { _request: tuples[0], allowed: true, },
            { _request: tuples[1], allowed: false },
            { _request: tuples[2], error: expect.any(Error) },
          ]));
      });
    });

    describe("Expand", () => {
      it("should properly call the Expand API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.expand(baseConfig.storeId!, tuple, undefined, ConsistencyPreference.HigherConsistency);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.expand(tuple, { authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1", consistency: ConsistencyPreference.HigherConsistency });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });
    });

    describe("ListObjects", () => {
      it("should call the api and return the response", async () => {
        const mockedResponse = { objects: ["document:roadmap"] };
        const scope = nocks.listObjects(baseConfig.storeId!, mockedResponse, undefined, ConsistencyPreference.HigherConsistency);

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.listObjects({
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "can_read",
          type: "document",
          contextualTuples:
            [{
              user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
              relation: "editor",
              object: "folder:product"
            }, {
              user: "folder:product",
              relation: "parent",
              object: "document:roadmap"
            }]
        }, {
          authorizationModelId: "01GAHCE4YVKPQEKZQHT2R89MQV",
          consistency: ConsistencyPreference.HigherConsistency,
        });

        expect(scope.isDone()).toBe(true);
        expect(response.objects).toHaveLength(mockedResponse.objects.length);
        expect(response.objects).toEqual(expect.arrayContaining(mockedResponse.objects));
      });
    });

    describe("ListRelations", () => {
      it("should properly pass the request and return an allowed API response", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "guest",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "reader",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "viewer",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "can_read",
          object: "workspace:1",
        }];
        const scope0 = nocks.check(defaultConfiguration.storeId!, tuples[0], defaultConfiguration.getBasePath(), { allowed: true }, undefined, ConsistencyPreference.HigherConsistency).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope1 = nocks.check(defaultConfiguration.storeId!, tuples[1], defaultConfiguration.getBasePath(), { allowed: false }, undefined, ConsistencyPreference.HigherConsistency).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope2 = nocks.check(defaultConfiguration.storeId!, tuples[2], defaultConfiguration.getBasePath(), { allowed: true }, undefined, ConsistencyPreference.HigherConsistency).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope3 = nocks.check(defaultConfiguration.storeId!, tuples[3], defaultConfiguration.getBasePath(), { allowed: false }, undefined, ConsistencyPreference.HigherConsistency).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope4 = nocks.check(defaultConfiguration.storeId!, tuples[4], defaultConfiguration.getBasePath(), { allowed: false }, undefined, ConsistencyPreference.HigherConsistency).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope5 = nock(defaultConfiguration.getBasePath())
          .get(`/stores/${defaultConfiguration.storeId!}/authorization-models`)
          .query({ page_size: 1 })
          .reply(200, {
            authorization_models: [],
          });

        expect(scope0.isDone()).toBe(false);
        expect(scope1.isDone()).toBe(false);
        expect(scope2.isDone()).toBe(false);
        expect(scope3.isDone()).toBe(false);
        expect(scope4.isDone()).toBe(false);
        expect(scope5.isDone()).toBe(false);
        const response = await fgaClient.listRelations({
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          object: "workspace:1",
          relations: ["admin", "guest", "reader", "viewer"],
        }, { consistency: ConsistencyPreference.HigherConsistency });

        expect(scope0.isDone()).toBe(true);
        expect(scope1.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(true);
        expect(scope3.isDone()).toBe(true);
        expect(scope4.isDone()).toBe(false);
        expect(scope5.isDone()).toBe(false);
        expect(response.relations.length).toBe(2);
        expect(response.relations.sort()).toEqual(expect.arrayContaining(["admin", "reader"]));
      });

      it("should throw an error if any check returns an error", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "guest",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "reader",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "viewer",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "can_read",
          object: "workspace:1",
        }];
        const scope0 = nocks.check(defaultConfiguration.storeId!, tuples[0], defaultConfiguration.getBasePath(), { allowed: true }).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope1 = nocks.check(defaultConfiguration.storeId!, tuples[1], defaultConfiguration.getBasePath(), { allowed: false }).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope2 = nocks.check(defaultConfiguration.storeId!, tuples[2], defaultConfiguration.getBasePath(), { allowed: true }).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope3 = nocks.check(defaultConfiguration.storeId!, tuples[3], defaultConfiguration.getBasePath(), "" as any, 500).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope4 = nocks.check(defaultConfiguration.storeId!, tuples[4], defaultConfiguration.getBasePath(), {
          "code": "validation_error",
          "message": "relation &#39;workspace#can_read&#39; not found"
        }, 400).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope5 = nock(defaultConfiguration.getBasePath())
          .get(`/stores/${defaultConfiguration.storeId!}/authorization-models`)
          .query({ page_size: 1 })
          .reply(200, {
            authorization_models: [],
          });

        expect(scope0.isDone()).toBe(false);
        expect(scope1.isDone()).toBe(false);
        expect(scope2.isDone()).toBe(false);
        expect(scope3.isDone()).toBe(false);
        expect(scope4.isDone()).toBe(false);
        expect(scope5.isDone()).toBe(false);

        try {
          const response = await fgaClient.listRelations({
            user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
            object: "workspace:1",
            relations: ["admin", "guest", "reader", "viewer"],
          });
        } catch (err) {
          expect(scope0.isDone()).toBe(true);
          expect(scope1.isDone()).toBe(true);
          expect(scope2.isDone()).toBe(true);
          expect(scope3.isDone()).toBe(true);
          expect(scope4.isDone()).toBe(false);
          expect(scope5.isDone()).toBe(false);
          expect(err).toBeInstanceOf(FgaApiError);
        }
      });

      it("should throw an error if no relations passed", async () => {
        try {
          await fgaClient.listRelations({
            user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
            object: "workspace:1",
          });
        } catch (err) {
          expect(err).toBeInstanceOf(FgaValidationError);
          expect((err as FgaValidationError).field).toBe("relations");
          expect((err as FgaValidationError).message).toBe("When calling listRelations, at least one relation must be passed in the relations field");
        }
      });

      it("should throw an error if auth fails", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }];

        const scope0 = nocks.check(baseConfig.storeId!, tuples[0], defaultConfiguration.getBasePath(), {} as any,401);
        const scope1 = nock(defaultConfiguration.getBasePath())
          .get(`/stores/${defaultConfiguration.storeId!}/authorization-models`)
          .query({ page_size: 1 })
          .reply(401, {
            authorization_models: [],
          });
        try {
          await fgaClient.listRelations({
            user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
            object: "workspace:1",
            relations: ["admin"],
          });
        } catch (err) {
          expect(err).toBeInstanceOf(FgaApiAuthenticationError);
        } finally {
          expect(scope0.isDone()).toBe(true);
          expect(scope1.isDone()).toBe(false);
        }
      });
    });

    describe("ListUsers", () => {
      it("should call the api and return the response", async () => {
        const mockedResponse: ListUsersResponse = {
          users: [{
            object: {
              type: "user",
              id: "81684243-9356-4421-8fbf-a4f8d36aa31b"
            },
          }, {
            userset: {
              type: "team",
              id: "engineering",
              relation: "member"
            },
          }, {
            wildcard: {
              type: "employee"
            }
          }]
        };
        const scope = nocks.listUsers(baseConfig.storeId!, mockedResponse, undefined, ConsistencyPreference.HigherConsistency);

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.listUsers({
          object: {
            type: "document",
            id: "roadmap"
          },
          relation: "can_read",
          user_filters: [{
            type: "user"
          }, {
            type: "team",
            relation: "member"
          }],
          context: {},
          contextualTuples:
            [{
              user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
              relation: "editor",
              object: "folder:product"
            }, {
              user: "folder:product",
              relation: "parent",
              object: "document:roadmap"
            }]
        }, {
          authorizationModelId: "01GAHCE4YVKPQEKZQHT2R89MQV",
          consistency: ConsistencyPreference.HigherConsistency
        });

        expect(scope.isDone()).toBe(true);
        expect(response.users).toHaveLength(mockedResponse.users.length);
        expect(response.users[0]).toMatchObject({
          object: {
            type: "user",
            id: "81684243-9356-4421-8fbf-a4f8d36aa31b"
          },
        });
        expect(response.users[1]).toMatchObject({
          userset: {
            type: "team",
            id: "engineering",
            relation: "member"
          },
        });
        expect(response.users[2]).toMatchObject({
          wildcard: {
            type: "employee"
          }
        });
        expect(response).toEqual(mockedResponse);
      });
    });

    /* Assertions */
    describe("ReadAssertions", () => {
      it("should properly call the ReadAssertions API", async () => {
        const modelId = "01H0THVNGCSAZ6SAQVTHPH3F0Q";
        const scope = nocks.readAssertions(defaultConfiguration.storeId!, modelId);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.readAssertions({ authorizationModelId: modelId });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({
          authorization_model_id: modelId,
          assertions: expect.arrayContaining([]),
        });
      });
    });

    describe("WriteAssertions", () => {
      it("should properly call the WriteAssertions API", async () => {
        const modelId = "01H0THVNGCSAZ6SAQVTHPH3F0Q";
        const scope = nocks.writeAssertions(defaultConfiguration.storeId!, modelId);

        expect(scope.isDone()).toBe(false);
        await fgaClient.writeAssertions([{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "viewer",
          object: "document:roadmap",
          expectation: true,
        }], { authorizationModelId: modelId });

        expect(scope.isDone()).toBe(true);
      });
    });
  });
});
