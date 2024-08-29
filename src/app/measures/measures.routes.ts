import { Router } from "express";
import { MeasuresController } from "./measures.controller";

const measuresRouter = Router();

measuresRouter.post("/upload", MeasuresController.upload);
measuresRouter.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

export default measuresRouter;
