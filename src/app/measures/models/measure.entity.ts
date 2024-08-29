import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "measures" })
export class MeasureEntity {
  @PrimaryColumn({
    unique: true,
  })
  id!: string;

  @Column()
  type!: string;

  @Column()
  image!: string;

  @Column()
  customer_code!: string;

  @Column()
  createdAt!: Date;

  @Column({ nullable: true, type: "timestamp" })
  updatedAt!: Date | null;
}
