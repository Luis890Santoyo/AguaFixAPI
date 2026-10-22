import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInitialTables1789172804896 implements MigrationInterface {
  name = 'CreateInitialTables1789172804896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE water_report_severity_enum AS ENUM('low', 'medium', 'high')`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'SYSTEM_USER',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'isNotificationEnabled',
            type: 'boolean',
            default: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'WATER_REPORT',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'severity',
            type: 'water_report_severity_enum',
            enum: ['low', 'medium', 'high'],
          },
          {
            name: 'reporterPhone',
            type: 'varchar',
          },
          {
            name: 'isResolved',
            type: 'boolean',
            default: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('WATER_REPORT');
    await queryRunner.dropTable('SYSTEM_USER');
    await queryRunner.query(`DROP TYPE water_report_severity_enum`);
  }
}
