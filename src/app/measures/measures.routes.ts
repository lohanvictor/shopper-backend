import { Router } from "express";
import { MeasuresController } from "./measures.controller";

const measuresRouter = Router();

measuresRouter.post("/upload", MeasuresController.upload);

export default measuresRouter;
