import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  port: env.get('PORT').default(3000).asPortNumber(),

  databaseHost: env.get('DATABASE_HOST').required().asString(),
  databasePort: env.get('DATABASE_PORT').required().asPortNumber(),
  databaseUser: env.get('DATABASE_USER').required().asString(),
  databasePassword: env.get('DATABASE_PASSWORD').required().asString(),
  databaseName: env.get('DATABASE_NAME').required().asString(),

  mailHost: env.get('MAIL_HOST').required().asString(),
  mailPort: env.get('MAIL_PORT').required().asPortNumber(),
  mailUser: env.get('MAIL_USER').asString(),
  mailPassword: env.get('MAIL_PASSWORD').asString(),
  mailFrom: env.get('MAIL_FROM').required().asString(),
  mailSecure: env.get('MAIL_SECURE').default('false').asBool(),

  maintenanceCrewEmail: env.get('MAINTENANCE_CREW_EMAIL').required().asString(),
};
