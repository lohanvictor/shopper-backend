import { Router } from "express";
import { MeasuresController } from "./measures.controller";

const measuresRouter = Router();

measuresRouter.post("/upload", MeasuresController.upload);
measuresRouter.patch("/confirm", MeasuresController.confirm);
measuresRouter.get("/:customer_code/list", MeasuresController.list);
measuresRouter.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

export default measuresRouter;
