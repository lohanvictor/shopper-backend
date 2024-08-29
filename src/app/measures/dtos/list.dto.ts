export interface ListParamsInputDTO {
  measure_type: string;
}

export interface ListRouteInputDTO {
  customer_code: string;
}

export interface ListOutputDTO {
  customer_code: string;
  measures: {
    measure_uuid: string;
    measure_datetime: Date;
    measure_type: string;
    has_confirmed: boolean;
    image_url: string;
  }[];
}
