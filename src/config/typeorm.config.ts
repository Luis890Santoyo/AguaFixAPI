import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Report } from '../reports/entities/report.entity';
import { envs } from './envs';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envs.databaseHost,
  port: envs.databasePort,
  username: envs.databaseUser,
  password: envs.databasePassword,
  database: envs.databaseName,
  entities: [User, Report],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  migrationsRun: false,
};
