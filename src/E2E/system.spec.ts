/**
 * This test wrapp all process for get a endpoint
 * begin from endpoint config and end from app server route
 */
import { Application } from "@/app";
import { Router, Controller, IEndpoint } from "@/utils";
import request from "supertest";
import { Router as ExpressRouter } from "express";
import { Server } from "http";

/** Create endpoint */
const testEndpoint: IEndpoint = {
  method: "get",
  path: "/test",
  action: (req, res) => {
    res.json({ message: "App is working" });
  },
  auth: true,
};

/** Create controller */
class TestController extends Controller {
  constructor() {
    super();
    super.indexEndpoints([testEndpoint]);
  }
}

/** Create router */
class TestRouter extends Router {
  constructor() {
    super([], new TestController());
  }
  route() {
    return super.route();
  }
}

/** Prepare test, instance application and other test dependencies */
let app: Application = new Application();
let router: TestRouter;
let indexRouter: ExpressRouter = ExpressRouter();
let server: Server;
beforeAll(async () => {
  server = await app.awake();
});
beforeEach(async () => {
  router = new TestRouter();
  indexRouter.use("/", router.route());
  app.expressApp.use(indexRouter);
});
afterAll(async () => {
  if (server) await server.close();
});
/** ----- */

describe(">>> System process", () => {
  it(">>> should access to [GET:/test] endpoint", async () => {
    const api = request(server);
    const { status, body } = await api.get("/test");
    expect(status).toEqual(200);
    expect(body).toMatchObject({ message: "App is working" });
  });
});
