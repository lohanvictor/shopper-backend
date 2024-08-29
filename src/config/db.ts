import { DataSource } from "typeorm";
import { MeasureEntity } from "../app/measures/models/measure.entity";

export const db = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "shopper_db",
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [MeasureEntity],
});
