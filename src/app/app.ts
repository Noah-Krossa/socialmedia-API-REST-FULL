import Express, { Application as ExpressApplication } from "express";
import { Server } from "http";
import Cors from "cors";
import Helmet from "helmet";
import Logger from "morgan";
import { connect } from "@/utils";

export class Application {
  private _app: ExpressApplication = Express();
  private _server: Server | undefined = undefined;

  public get Server(): Server | undefined {
    return this._server;
  }
  public async setup() {
    if (process.env.NODE_ENV === "development") require("dotenv").config();

    /** Set default middlewares */
    this._app.use(Helmet());
    this._app.use(Express.urlencoded({ extended: true }));
    this._app.use(Express.json());
    this._app.use(Cors());
    this._app.use(Logger("dev"));

    /** set server port */
    await connect();
    this._app.set("port", process.env.PORT);
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
