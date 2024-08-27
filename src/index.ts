import express from "express";
import { measuresRouter } from "./app/measures";

const app = express();

app.use(express.json());
app.use("/", measuresRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
