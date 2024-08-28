import { DataSource } from "typeorm";

export const db = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || "lohan",
  password: process.env.POSTGRES_PASSWORD || "admin",
  database: "measures",
  synchronize: false,
  logging: true,
  entities: [],
});
