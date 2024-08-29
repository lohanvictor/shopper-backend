import { measureTypes } from "./constants";
import { MeasureType } from "./interfaces/measures.interface";

export class MeasuresUtils {
  static isBase64Image(image: string): boolean {
    const base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(image) && !/^[a-zA-Z]+$/.test(image);
  }

  static isMeasureType(measure_type: string): boolean {
    console.log(measureTypes);
    return measureTypes.some(
      (type) => type.toLowerCase() === measure_type.toLowerCase()
    );
  }
}
