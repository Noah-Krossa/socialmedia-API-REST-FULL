import { Router } from "@/utils";
import { AcountController } from "@/controllers";
import { Router as ExpressRouter } from "express";

class AcountRouter extends Router {
  constructor() {
    /** Add default controller */
    super([], new AcountController());
  }
  public route(): ExpressRouter {
    return super.route();
  }
}

export default new AcountRouter();
