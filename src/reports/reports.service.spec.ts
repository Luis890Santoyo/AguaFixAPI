import { Test, TestingModule } from '@nestjs/testing';
import { Severity } from './enums/severity.enum';
import { ReportsRepository } from './reports.repository';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let reportsService: ReportsService;
  let reportsRepository: { create: jest.Mock; findAll: jest.Mock };

  beforeEach(async () => {
    reportsRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsService, { provide: ReportsRepository, useValue: reportsRepository }],
    }).compile();

    reportsService = module.get(ReportsService);
  });

  describe('create', () => {
    it('debe guardar el reporte a través del repositorio', async () => {
      const dto = {
        address: 'Calle Falsa 123',
        description: 'Fuga en la banqueta',
        severity: Severity.HIGH,
        reporterPhone: '5512345678',
      };
      const photoUrl = 'https://bucket.s3.us-east-1.amazonaws.com/reports/foto.jpg';
      const reporteGuardado = {
        id: 1,
        ...dto,
        photoUrl,
        repairPhotoUrl: null,
        isResolved: false,
        createdAt: new Date(),
      };
      reportsRepository.create.mockResolvedValue(reporteGuardado);

      const resultado = await reportsService.create(dto, photoUrl);

      expect(reportsRepository.create).toHaveBeenCalledWith({ ...dto, photoUrl });
      expect(resultado).toEqual(reporteGuardado);
    });
  });

  describe('findAll', () => {
    it('debe devolver la lista de reportes del repositorio', async () => {
      const reportes = [
        {
          id: 1,
          address: 'Calle Falsa 123',
          description: 'Fuga en la banqueta',
          severity: Severity.LOW,
          reporterPhone: '5512345678',
          photoUrl: 'https://bucket.s3.us-east-1.amazonaws.com/reports/foto.jpg',
          repairPhotoUrl: null,
          isResolved: false,
          createdAt: new Date(),
        },
      ];
      reportsRepository.findAll.mockResolvedValue(reportes);

      const resultado = await reportsService.findAll();

      expect(resultado).toEqual(reportes);
    });
  });
});
