import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Severity } from '../enums/severity.enum';

@Entity('WATER_REPORT')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: Severity })
  severity: Severity;

  @Column({ type: 'varchar' })
  reporterPhone: string;

  @Column({ type: 'varchar' })
  photoUrl: string;

  @Column({ type: 'varchar', nullable: true })
  repairPhotoUrl: string | null;

  @Column({ type: 'boolean', default: false })
  isResolved: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
