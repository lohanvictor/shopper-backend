import { Request, Response } from "express";
import { UploadInputDTO } from "./dto/upload.dto";

export class MeasuresController {
  static async upload(req: Request<{}, {}, UploadInputDTO>, res: Response) {
    // verificar o body da requisição
    
    // verificar se a leitura já foi feita no mês atual

    // realizar operação de upload
  }
}
