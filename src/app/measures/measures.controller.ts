import { Request, Response } from "express";
import { UploadInputDTO, UploadOutputDTO } from "./dto/upload.dto";
import { MeasuresUtils } from "./measures.utils";
import { MeasuresRequestErrors } from "./interfaces/measures.error";

export class MeasuresController {
  static async upload(req: Request<{}, {}, UploadInputDTO>, res: Response) {
    // verificar o body da requisição
    const errors = MeasuresUtils.getErrorsInUpload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        error_code: MeasuresRequestErrors.INVALID_DATA,
        error_description: errors,
      });
    }

    // verificar se a leitura já foi feita no mês atual

    // realizar operação de upload

    // retornar
    return res.status(200).json({
      image_url: "",
      measure_uuid: "",
      measure_value: 0,
    } as UploadOutputDTO);
  }
}
