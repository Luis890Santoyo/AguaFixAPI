import { Body, Controller, Get, Post } from '@nestjs/common';
import { envs } from '../config/envs';
import { EmailService } from '../email/email.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { generateReportTemplate } from './templates/report.template';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    const report = await this.reportsService.create(createReportDto);

    await this.emailService.sendEmail(
      envs.maintenanceCrewEmail,
      'Nuevo reporte de fuga de agua',
      generateReportTemplate(createReportDto),
    );

    return report;
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
