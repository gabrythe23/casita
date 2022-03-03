import { MigrationInterface, QueryRunner } from 'typeorm';

export class bulbMerossCloudSynch1646267050714 implements MigrationInterface {
  name = 'bulbMerossCloudSynch1646267050714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bulbs\` (\`id\` varchar(255) NOT NULL, \`deviceId\` varchar(255) NOT NULL, \`cloudName\` varchar(255) NOT NULL, \`commonName\` varchar(255) NULL, \`registeredDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`bulbs\``);
  }
}
