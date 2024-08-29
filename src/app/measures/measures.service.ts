import { UploadInputDTO, UploadOutputDTO } from "./dtos/upload.dto";
import { MeasureType } from "./interfaces/measures.interface";
import { MeasuresUtils } from "./measures.utils";
import { MeasureEntity } from "./models/measure.entity";
import { MeasuresReporitory } from "./repository/measure.repository";
import { v4 as uuid } from "uuid";

export class MeasuresService {
  static getErrorsInUpload(input: UploadInputDTO): string {
    const errors: string[] = [];
    if (input.image === undefined) {
      errors.push("imagem obrigatória");
    } else if (input.image === "") {
      errors.push("imagem está vazia");
    } else if (!MeasuresUtils.isBase64Image(input.image)) {
      errors.push("imagem não está em base64");
    }

    if (input.customer_code === undefined) {
      errors.push("código do cliente obrigatório");
    } else if (input.customer_code === "") {
      errors.push("código do cliente está vazio");
    }

    if (input.measure_type === undefined) {
      errors.push("tipo de medida obrigatório");
    } else if (!MeasuresUtils.measureTypes.includes(input.measure_type)) {
      errors.push("tipo de medida inválido");
    }

    return errors.join(", ");
  }

  static async uploadAlreadyExists(input: UploadInputDTO): Promise<boolean> {
    const { customer_code, measure_type, measure_datetime } = input;

    const measures = await MeasuresReporitory.findMeasure(
      customer_code,
      measure_datetime,
      measure_type
    );
    if (measures === null) return false;

    const today = new Date(input.measure_datetime);

    const result = measures.some((measure) => {
      const createdAt = new Date(measure.createdAt);
      return (
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getFullYear() === today.getFullYear()
      );
    });
    return result;
  }

  static async save(input: UploadInputDTO): Promise<UploadOutputDTO> {
    const { image, measure_type, customer_code, measure_datetime } = input;

    const measure = new MeasureEntity();
    measure.id = uuid();
    measure.createdAt = new Date(measure_datetime);
    measure.image = image;
    measure.customer_code = customer_code;
    measure.type = measure_type;
    measure.updatedAt = null;

    await MeasuresReporitory.save(measure);

    return {
      image_url: "",
      measure_uuid: measure.id,
      measure_value: 0,
    };
  }
}
