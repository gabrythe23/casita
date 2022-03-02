import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColorToDb1646220396992 implements MigrationInterface {
  name = 'addColorToDb1646220396992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`colors\` (\`id\` varchar(255) NOT NULL, \`scope\` enum ('MORNING', 'BEFORE_SUNSET_SUNRISE', 'NIGHT', 'AFTER_SUNSET') NOT NULL, \`temperature\` int NOT NULL, \`rgb\` int NOT NULL, \`luminance\` int NOT NULL, \`capacity\` int NOT NULL, \`registeredDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`colors\``);
  }
}
