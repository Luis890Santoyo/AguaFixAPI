import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Report } from '../reports/entities/report.entity';
import { envs } from './envs';

export default new DataSource({
  type: 'postgres',
  host: envs.databaseHost,
  port: envs.databasePort,
  username: envs.databaseUser,
  password: envs.databasePassword,
  database: envs.databaseName,
  entities: [User, Report],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
