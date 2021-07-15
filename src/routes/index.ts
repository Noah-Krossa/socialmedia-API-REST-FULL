import AcountRouterInstance from "./acount.router";
import { Router } from "express";

const indexRouter = Router();

indexRouter.use("/acount", AcountRouterInstance.route());

export default indexRouter;
