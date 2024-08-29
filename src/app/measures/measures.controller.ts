import { Request, Response } from "express";
import { UploadInputDTO, UploadOutputDTO } from "./dtos/upload.dto";
import { MeasuresRequestErrors } from "./interfaces/measures.error";
import { MeasuresService } from "./measures.service";

export class MeasuresController {
  static async upload(req: Request<{}, {}, UploadInputDTO>, res: Response) {
    // verificar o body da requisição
    const errors = MeasuresService.getErrorsInUpload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        error_code: MeasuresRequestErrors.INVALID_DATA,
        error_description: errors,
      });
    }

    // verificar se a leitura já foi feita no mês atual
    const uploadAlreadyExists = await MeasuresService.uploadAlreadyExists(
      req.body
    );
    if (uploadAlreadyExists) {
      return res.status(409).json({
        error_code: MeasuresRequestErrors.DOUBLE_REPORT,
        error_description: "Leitura do mês já realizada",
      });
    }

    // realizar operação de upload
    const result = await MeasuresService.save(req.body);

    // retornar
    return res.status(200).json(result);
  }
}
