import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

if (process.env.NODE_ENV === "development") require("dotenv").config();

const { NODE_ENV, MONGODB_URI, PORT } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

let mongod: MongoMemoryServer;
export async function connect() {
  let uri = null;
  if (NODE_ENV === "test") {
    mongod = await MongoMemoryServer.create();
    uri = await mongod.getUri();
  } else {
    uri = MONGODB_URI || "";
  }
  await mongoose.connect(uri, options);
  console.debug("Connected to mongodb database");
}

export async function close() {
  await mongoose.connection.close(true);
  if (mongod) await mongod.stop();
}

export async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}
