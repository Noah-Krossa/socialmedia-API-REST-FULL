import { IEndpoint } from "./endpoint.h";
import { Router } from "./router";

export abstract class Controller {
  protected _endpoints: IEndpoint[] = [];
  protected _router: Router | null;

  public get Endpoints(): IEndpoint[] {
    return this._endpoints;
  }

  public indexEndpoints(endpointList: IEndpoint[]): void {
    this._endpoints = [...this._endpoints, ...endpointList];
  }
}
