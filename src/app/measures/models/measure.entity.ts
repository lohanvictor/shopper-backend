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
  value!: number;

  @Column()
  customer_code!: string;

  @Column()
  createdAt!: Date;

  @Column()
  has_confirmed!: boolean;
}
