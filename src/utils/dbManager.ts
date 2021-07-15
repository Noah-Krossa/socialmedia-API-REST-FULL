import mongoose from "mongoose";
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { NODE_ENV, MONGODB_URI, MONGODB_TEST_URI } = process.env;

export class MongoDBManager {
  public async connect(
    options: any = { useUnifiedTopology: true, useNewUrlParser: true }
  ) {
    const uri = (NODE_ENV === "test" ? MONGODB_TEST_URI : MONGODB_URI) || "";
    await mongoose.connect(uri, options);
  }

  public async disconnect() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  public async clearDatabase() {
    if (NODE_ENV !== "test") return;
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
