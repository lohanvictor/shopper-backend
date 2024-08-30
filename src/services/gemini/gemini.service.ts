import { unlink, writeFile } from "fs/promises";
import { geminiFileManager, geminiModel } from "../../config/gemini";

export class GeminiService {
  /**
   * Retorna o valor de medição da imagem.
   * 
   * @param data - A imagem codificada em Base64.
   * @param mimeType - O MIME type da imagem.
   * @param measureType - O tipo de medida da imagem (water/gas).
   * @returns Retorna um inteiro representando o valor identificado na imagem. Caso não identifique, retorna -1.
   */
  static async getMeasure(
    data: string,
    mimeType: string,
    measureType: string
  ): Promise<number> {
    const prompt = `The image sent is a ${measureType} measurement. Identify the measurement you want to obtain in the image. Return the answer in number format with the value of the measurement in integer. If you can't identify the measurement, return the value as -1.`;
    const result = await geminiModel.generateContent([
      {
        inlineData: {
          data,
          mimeType,
        },
      },
      {
        text: prompt,
      },
    ]);

    try {
      const value = Number(result.response.text());
      return value;
    } catch {
      return -1;
    }
  }

  /**
   * Armazena uma iamgem no gerenciador de arquivos do Gemini.
   * 
   * @param name - O nome da imagem.
   * @param imageBase64 - A imagem codificada em Base64.
   * @returns Um URI da imagem no  gerenciador de arquivos do Gemini.
   */
  static async uploadImage(name: string, imageBase64: string): Promise<string> {
    const path = "./out.png";
    await writeFile(path, imageBase64, "base64");

    const uploadResult = await geminiFileManager.uploadFile(path, {
      mimeType: "image/png",
      displayName: name,
    });

    await unlink(path);

    return uploadResult.file.uri;
  }
}
