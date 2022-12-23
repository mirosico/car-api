import { IsBoolean } from 'class-validator';

export class ApproveRejectReportDto {
  @IsBoolean()
  approved: boolean;
}
