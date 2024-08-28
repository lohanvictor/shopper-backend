import { UploadInputDTO } from "./dto/upload.dto";
import { MeasureType } from "./interfaces/measures.interface";

export class MeasuresUtils {
  static measureTypes: string[] = [MeasureType.WATER, MeasureType.GAS];

  static isBase64Image(image: string): boolean {
    const base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(image) && !/^[a-zA-Z]+$/.test(image);
  }

  static getErrorsInUpload(input: UploadInputDTO): string {
    const errors: string[] = [];
    if (input.image === undefined) {
      errors.push("imagem obrigatória");
    } else if (input.image === "") {
      errors.push("imagem está vazia");
    } else if (!this.isBase64Image(input.image)) {
      errors.push("imagem não está em base64");
    }

    if (input.measure_type === undefined) {
      errors.push("tipo de medida obrigatório");
    } else if (!this.measureTypes.includes(input.measure_type)) {
      errors.push("tipo de medida inválido");
    }

    return errors.join(", ");
  }
}
