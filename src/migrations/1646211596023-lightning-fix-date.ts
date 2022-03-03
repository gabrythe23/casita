import { MigrationInterface, QueryRunner } from 'typeorm';

export class lightningFixDate1646211596023 implements MigrationInterface {
  name = 'lightningFixDate1646211596023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bulb_lightning\` DROP COLUMN \`start\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bulb_lightning\` ADD \`start\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bulb_lightning\` DROP COLUMN \`end\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bulb_lightning\` ADD \`end\` datetime NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bulb_lightning\` DROP COLUMN \`end\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bulb_lightning\` ADD \`end\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bulb_lightning\` DROP COLUMN \`start\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bulb_lightning\` ADD \`start\` int NOT NULL`,
    );
  }
}
