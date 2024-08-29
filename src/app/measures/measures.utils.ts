import { MeasureType } from "./interfaces/measures.interface";

export class MeasuresUtils {
  static measureTypes: string[] = [MeasureType.WATER, MeasureType.GAS];

  static isBase64Image(image: string): boolean {
    const base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(image) && !/^[a-zA-Z]+$/.test(image);
  }
}
