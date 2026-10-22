import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhotoUrlToWaterReport1789172904896 implements MigrationInterface {
  name = 'AddPhotoUrlToWaterReport1789172904896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "WATER_REPORT" ADD "photoUrl" varchar NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(`ALTER TABLE "WATER_REPORT" ALTER COLUMN "photoUrl" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "WATER_REPORT" ADD "repairPhotoUrl" varchar`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "WATER_REPORT" DROP COLUMN "repairPhotoUrl"`);
    await queryRunner.query(`ALTER TABLE "WATER_REPORT" DROP COLUMN "photoUrl"`);
  }
}
