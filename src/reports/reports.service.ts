import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
import { ReportsRepository } from './reports.repository';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  create(createReportDto: CreateReportDto): Promise<Report> {
    return this.reportsRepository.create(createReportDto);
  }

  findAll(): Promise<Report[]> {
    return this.reportsRepository.findAll();
  }
}
