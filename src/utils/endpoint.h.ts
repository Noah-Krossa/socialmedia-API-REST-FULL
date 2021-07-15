import { Request, Response, NextFunction } from "express";

export interface IEndpoint {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
  action(req: Request, res: Response, next?: NextFunction): void;
  auth?: boolean;
}
