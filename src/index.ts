import express from "express";
import { measuresRouter } from "./app/measures";

import "reflect-metadata";
import { db } from "./config/db";

const app = express();

app.use(express.json());
app.use("/", measuresRouter);

(async () => {
  try {
    await db.initialize();
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error(err);
  }
})();
