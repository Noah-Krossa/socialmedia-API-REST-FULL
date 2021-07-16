import Express, { Application as ExpressApplication } from "express";
import { Server } from "http";
import Cors from "cors";
import Helmet from "helmet";
import Logger from "morgan";
import { MongoDBManager } from "@/utils";
import IndexRouter from "@/routes";

export class Application {
  private _app: ExpressApplication = Express();
  private _server: Server | undefined = undefined;
  private _mongodbManager: MongoDBManager = new MongoDBManager();

  public get Server(): Server | undefined {
    return this._server;
  }
  public get expressApp(): ExpressApplication {
    return this._app;
  }

  public async setup() {
    if (process.env.NODE_ENV !== "production") require("dotenv").config();

    /** Set default middlewares */
    this._app.use(Helmet());
    this._app.use(Express.urlencoded({ extended: true }));
    this._app.use(Express.json());
    this._app.use(Cors());
    this._app.use(Logger("dev"));

    /** set server port */
    this._app.set("port", process.env.PORT);

    /** Connect to database only when it's not in test env */
    if (process.env.NODE_ENV !== "test") {
      this._mongodbManager.connect();
      console.debug("Connected to mongodb database");
    }
    /** Index router */
    this._app.use("/", IndexRouter);
  }

  public async awake(): Promise<Server> {
    await this.setup();
    if (!this._server) {
      const PORT = this._app.get("port");
      this._server = this._app.listen(PORT, () => {
        console.debug("Running express server on port: " + PORT);
      });
    }
    return this._server;
  }
}
