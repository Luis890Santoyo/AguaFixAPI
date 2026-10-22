import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { envs } from '../config/envs';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { generateReportTemplate } from './templates/report.template';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    if (!photo) {
      throw new BadRequestException('La foto de la fuga es obligatoria');
    }

    const photoUrl = await this.storageService.uploadFile(photo, 'reports');
    const report = await this.reportsService.create(createReportDto, photoUrl);

    await this.emailService.sendEmail(
      envs.maintenanceCrewEmail,
      'Nuevo reporte de fuga de agua',
      generateReportTemplate(createReportDto, photoUrl),
    );

    return report;
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
