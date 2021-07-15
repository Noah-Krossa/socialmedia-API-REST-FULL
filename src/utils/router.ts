import { Controller } from "./controller";
import { Router as ExpressRouter } from "express";

export class Router {
  protected _controllers: Controller[] = [];
  protected _expressRouter: ExpressRouter = ExpressRouter();

  /** FIXME: create type of middleware */
  constructor(middlewareList?: any[], defaultController?: Controller) {
    this._expressRouter = ExpressRouter();

    defaultController && this._controllers.push(defaultController);

    if (middlewareList) {
      for (const middleware of middlewareList) {
        this._expressRouter.use(middleware);
      }
    }
  }

  public get Controllers(): Controller[] {
    return this._controllers;
  }

  public addControllers(controllerList: Controller[]): void {
    this._controllers = [...this._controllers, ...controllerList];
  }

  public route(): ExpressRouter {
    for (const controller of this._controllers) {
      for (const endpoint of controller.Endpoints) {
        switch (endpoint.method) {
          case "get":
            this._expressRouter.get(endpoint.path, endpoint.action);
            break;
          case "post":
            this._expressRouter.post(endpoint.path, endpoint.action);
            break;
          case "delete":
            this._expressRouter.delete(endpoint.path, endpoint.action);
            break;
          case "patch":
            this._expressRouter.patch(endpoint.path, endpoint.action);
            break;
          case "put":
            this._expressRouter.patch(endpoint.path, endpoint.action);
            break;
        }
      }
    }
    return this._expressRouter;
  }
}
