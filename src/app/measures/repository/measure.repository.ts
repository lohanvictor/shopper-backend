import { MeasureEntity } from "../models/measure.entity";
import { db } from "../../../config/db";

export class MeasuresReporitory {
  public static model = db.getRepository(MeasureEntity);

  static async save(data: MeasureEntity): Promise<void> {
    MeasuresReporitory.model.save(data);
  }

  static async findByCustomerCode(
    customer_code: string
  ): Promise<MeasureEntity[]> {
    const result = MeasuresReporitory.model.find({
      where: { customer_code },
      order: { createdAt: "DESC" },
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
    const measuresQuery = await MeasuresReporitory.model
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
