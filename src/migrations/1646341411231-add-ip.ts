import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIp1646341411231 implements MigrationInterface {
  name = 'addIp1646341411231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bulbs\` ADD \`ip\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`bulbs\` DROP COLUMN \`ip\``);
  }
}
