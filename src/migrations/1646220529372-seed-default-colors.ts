import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedDefaultColors1646220529372 implements MigrationInterface {
  name = 'seedDefaultColors1646220529372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`casita\`.\`colors\` (\`id\`, \`scope\`, \`temperature\`, \`rgb\`, \`luminance\`, \`capacity\`) VALUES ('092cc0cc-7835-4c4d-85cf-cefe5a81e4ae', 'MORNING', 95, 16711825, 100, 6)`,
    );
    await queryRunner.query(
      `INSERT INTO \`casita\`.\`colors\` (\`id\`, \`scope\`, \`temperature\`, \`rgb\`, \`luminance\`, \`capacity\`) VALUES ('7cf03e50-2800-4da6-a7c5-1bb4939ed41f', 'BEFORE_SUNSET_SUNRISE', 1, 16755038, 100, 6)`,
    );
    await queryRunner.query(
      `INSERT INTO \`casita\`.\`colors\` (\`id\`, \`scope\`, \`temperature\`, \`rgb\`, \`luminance\`, \`capacity\`) VALUES ('91b396f1-ee16-4f77-ba26-d81f546867b7', 'AFTER_SUNSET', 1, 16755038, 100, 6)`,
    );
    await queryRunner.query(
      `INSERT INTO \`casita\`.\`colors\` (\`id\`, \`scope\`, \`temperature\`, \`rgb\`, \`luminance\`, \`capacity\`) VALUES ('a4af7637-d705-4b35-8e78-1605b9144831', 'NIGHT', 1, 16711680, 98, 5)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`colors\``);
  }
}
