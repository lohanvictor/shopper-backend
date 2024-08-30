import { measureTypes } from "./constants";

export class MeasuresUtils {
  /**
   * Verifica se a string enviada é uma imagem codificada em base64 válida.
   * 
   * @param image - A string a ser verificada.
   * @returns Um boleano indicando se é um base64 válida ou não.
   */
  static isBase64Image(image: string): boolean {
    const base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(image) && !/^[a-zA-Z]+$/.test(image);
  }

  /**
   * Vefifica se o tipo de medida é válido.
   * 
   * @param measure_type - O tipo de medida para verificar.
   * @returns Um boleano indicando se o tipo de medida é válido ou não.
   */
  static isMeasureType(measure_type: string): boolean {
    return measureTypes.some(
      (type) => type.toLowerCase() === measure_type.toLowerCase()
    );
  }
}
