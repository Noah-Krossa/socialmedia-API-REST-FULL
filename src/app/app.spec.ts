import { Application } from ".";

let app: Application;

beforeEach(() => {
  app = new Application();
});

afterAll(async () => {
  if (app.Server) await app.Server.close();
});

describe(">>> App", () => {
  it("Should setup and awake app", async () => {
    const spy = jest.spyOn(app, "setup");
    expect(spy).toBeCalledTimes(0);
    await app.awake();
    expect(spy).toBeCalledTimes(1);
    expect(app.Server).toBeDefined();
  });
});
