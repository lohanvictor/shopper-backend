import { DataSource } from "typeorm";
import { MeasureEntity } from "../app/measures/models/measure.entity";

export const db = new DataSource({
  type: "postgres",
  host: "shopper_db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [MeasureEntity],
});
