export interface UploadInputDTO {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: string;
}

export interface UploadOutputDTO {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
}
