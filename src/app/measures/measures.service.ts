import { ConfirmInputDTO, ConfirmOutputDTO } from "./dtos/confirm.dto";
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

  static getErrorsInConfirm(input: ConfirmInputDTO): string {
    const errors: string[] = [];

    if (input.measure_uuid === undefined || input.measure_uuid === "") {
      errors.push("uuid é obrigatório");
    }

    if (input.confirmed_value === undefined) {
      errors.push("valor confirmado é obrigatório");
    } else if (typeof input.confirmed_value !== "number") {
      errors.push("valor confirmado deve ser um número");
    } else if (input.confirmed_value < 0) {
      errors.push("valor confirmado deve ser válido");
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
    measure.has_confirmed = false;
    measure.value = 0;

    await MeasuresReporitory.save(measure);

    return {
      image_url: "",
      measure_uuid: measure.id,
      measure_value: measure.value,
    };
  }

  static async measureExists(input: ConfirmInputDTO): Promise<boolean> {
    const { measure_uuid } = input;
    const measure = await MeasuresReporitory.findById(measure_uuid);
    return measure !== null;
  }

  static async measureConfirmed(input: ConfirmInputDTO): Promise<boolean> {
    const { measure_uuid } = input;
    const measure = await MeasuresReporitory.findById(measure_uuid);
    return !!measure && measure.has_confirmed;
  }

  static async updateValue(input: ConfirmInputDTO): Promise<ConfirmOutputDTO> {
    const { measure_uuid, confirmed_value } = input;
    const measure = (await MeasuresReporitory.findById(measure_uuid))!;
    measure.value = confirmed_value;
    measure.has_confirmed = true;

    await MeasuresReporitory.save(measure);

    return {
      success: true,
    };
  }
}
