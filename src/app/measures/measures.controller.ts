import { Request, Response } from "express";
import { UploadInputDTO, UploadOutputDTO } from "./dtos/upload.dto";
import { MeasuresRequestErrors } from "./interfaces/measures.error";
import { MeasuresService } from "./measures.service";
import { ConfirmInputDTO } from "./dtos/confirm.dto";
import { ListParamsInputDTO, ListRouteInputDTO } from "./dtos/list.dto";
import { MeasuresUtils } from "./measures.utils";

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

  static async confirm(req: Request<{}, {}, ConfirmInputDTO>, res: Response) {
    // verificar o body da requisição
    const errors = MeasuresService.getErrorsInConfirm(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        error_code: MeasuresRequestErrors.INVALID_DATA,
        error_description: errors,
      });
    }

    // verificar se o id existe
    const measureExists = await MeasuresService.measureExists(req.body);
    if (!measureExists) {
      return res.status(404).json({
        error_code: MeasuresRequestErrors.MEASURE_NOT_FOUND,
        error_description: "Leitura não encontrada",
      });
    }

    // verificar se a leitura já foi confirmada
    const confirmationExists = await MeasuresService.measureConfirmed(req.body);
    if (confirmationExists) {
      return res.status(409).json({
        error_code: MeasuresRequestErrors.CONFIRMATION_DUPLICATE,
        error_description: "Leitura já confirmada",
      });
    }

    // salvar a verificação
    const result = await MeasuresService.updateValue(req.body);
    return res.status(200).json(result);
  }

  static async list(
    req: Request<ListRouteInputDTO, {}, {}, ListParamsInputDTO>,
    res: Response
  ) {
    const { measure_type } = req.query;
    const { customer_code } = req.params;

    // verificar tipo de medida
    if (measure_type !== undefined) {
      const measureTypeIsValid = MeasuresUtils.isMeasureType(measure_type);
      if (!measureTypeIsValid) {
        return res.status(400).json({
          error_code: MeasuresRequestErrors.INVALID_TYPE,
          error_description: "Tipo de medição não permitida",
        });
      }
    }

    // verificar registro
    const measures = await MeasuresService.list(customer_code, measure_type);

    if (measures.measures.length === 0) {
      return res.status(404).json({
        error_code: MeasuresRequestErrors.MEASURE_NOT_FOUND,
        error_description: "Nenhuma leitura encontrada",
      });
    }

    return res.status(200).json(measures);
  }
}
