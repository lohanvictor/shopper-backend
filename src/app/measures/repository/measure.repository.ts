import { MeasureEntity } from "../models/measure.entity";
import { db } from "../../../config/db";

export class MeasuresReporitory {
  public static model = db.getRepository(MeasureEntity);

  static async save(data: MeasureEntity): Promise<void> {
    MeasuresReporitory.model.save(data);
  }

  static async findById(id: string): Promise<MeasureEntity | null> {
    return MeasuresReporitory.model.findOneBy({ id });
  }

  static async find(
    customer_code: string,
    measure_type?: string
  ): Promise<MeasureEntity[]> {
    const result = MeasuresReporitory.model.find({
      where: {
        customer_code,
        ...(measure_type && { type: measure_type.toUpperCase() }),
      },
    });

    return result === null ? [] : result;
  }

  static async findMeasure(
    customer_code: string,
    datetime: string,
    measure_type?: string
  ): Promise<MeasureEntity[]> {
    // const result = await MeasuresReporitory.model.find({
    //   where: { customer_code, type: measure_type },
    //   order: { createdAt: "DESC" },
    // });

    const [year, month] = datetime.split("-");
    const measuresQuery = MeasuresReporitory.model
      .createQueryBuilder("measure")
      .where("EXTRACT(YEAR FROM measure.createdAt) = :year", { year })
      .andWhere("EXTRACT(MONTH FROM measure.createdAt) = :month", { month })
      .andWhere("measure.customer_code = :customer_code", { customer_code });

    if (measure_type)
      measuresQuery.andWhere("measure.type = :measure_type", { measure_type });

    const measures = await measuresQuery.getMany();

    return measures;
  }
}
