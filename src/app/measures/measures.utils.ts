import { UploadInputDTO } from "./dto/upload.dto";
import { MeasureType } from "./interfaces/measures.interface";

export class MeasuresUtils {
  static measureTypes: string[] = [MeasureType.WATER, MeasureType.GAS];

  static getErrorsInUpload(input: UploadInputDTO): string {
    const errors: string[] = [];
    if (input.image === undefined || input.image === "") {
      errors.push("imagem está vazia");
    }

    if (!this.measureTypes.includes(input.measure_type)) {
      errors.push("tipo de medida inválido");
    }
    return errors.join(', ');
  }
}
