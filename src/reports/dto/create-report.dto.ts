import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Severity } from '../enums/severity.enum';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Severity)
  severity: Severity;

  @IsString()
  @IsNotEmpty()
  reporterPhone: string;
}
