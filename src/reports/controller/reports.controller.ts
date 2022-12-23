import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { CreateReportDto } from '../dtos/create-report.dto';
import { ReportsService } from '../services/reports.service';
import { AuthGurad } from '../../gurads/auth.gurad';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { ReportDto } from '../dtos/report.dto';
import { ApproveRejectReportDto } from '../dtos/approve-report.dto';
import { AdminGuard } from '../../gurads/admin.guard';
import { GetEstimateDto } from '../dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(AuthGurad)
  @Post()
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveRejectReport(
    @Param('id') id: string,
    @Body() body: ApproveRejectReportDto,
  ) {
    return this.reportsService.changeApproval(parseInt(id), body.approved);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }
}
