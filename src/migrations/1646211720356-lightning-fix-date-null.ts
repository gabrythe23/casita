import {MigrationInterface, QueryRunner} from "typeorm";

export class lightningFixDateNull1646211720356 implements MigrationInterface {
    name = 'lightningFixDateNull1646211720356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bulb_lightning\` CHANGE \`end\` \`end\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`bulb_lightning\` CHANGE \`length\` \`length\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bulb_lightning\` CHANGE \`length\` \`length\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bulb_lightning\` CHANGE \`end\` \`end\` datetime NOT NULL`);
    }

}
