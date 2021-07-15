import { AcountService } from ".";
import { MongoDBManager } from "@/utils";
import { Acount } from "@/models";

const theMongodbManager = new MongoDBManager();
let theAcountService: AcountService;

beforeAll(async () => {
  await theMongodbManager.connect();
});

beforeEach(async () => {
  theAcountService = new AcountService();
  await theMongodbManager.clearDatabase();
});

afterAll(async () => {
  await theMongodbManager.disconnect();
});

describe(">>> AcountService", () => {
  it("should register, remove and update acount", async () => {
    const id = await theAcountService.create({
      username: "noah",
      password: "1234",
      email: "hel@fg.com",
    });
    expect(id).toBeDefined();

    const foundUser = await Acount.Model.findById(id.toString());
    expect(foundUser).toEqual(
      expect.objectContaining({
        username: "noah",
        email: "hel@fg.com",
      })
    );

    const updatedDocument = await theAcountService.updateById(
      { username: "antonio" },
      id.toString()
    );
    expect(updatedDocument).toEqual(
      expect.objectContaining({
        username: "antonio",
        email: "hel@fg.com",
      })
    );

    await theAcountService.removeById(id.toString());
    const _foundUser = await Acount.Model.findById(id.toString());
    expect(_foundUser).toBeNull();
  });
});
