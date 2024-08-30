import { unlink, writeFile } from "fs/promises";
import { geminiFileManager, geminiModel } from "../../config/gemini";

export class GeminiService {
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
