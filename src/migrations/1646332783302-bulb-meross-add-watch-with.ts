import {MigrationInterface, QueryRunner} from "typeorm";

export class bulbMerossAddWatchWith1646332783302 implements MigrationInterface {
    name = 'bulbMerossAddWatchWith1646332783302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bulbs\` ADD \`watchWith\` enum ('CLOUD', 'LOCAL') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bulbs\` DROP COLUMN \`watchWith\``);
    }

}
