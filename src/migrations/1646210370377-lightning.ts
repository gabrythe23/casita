import {MigrationInterface, QueryRunner} from "typeorm";

export class lightning1646210370377 implements MigrationInterface {
    name = 'lightning1646210370377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bulb_lightning\` (\`id\` varchar(255) NOT NULL, \`bulb\` varchar(255) NOT NULL, \`start\` datetime NOT NULL, \`end\` datetime NOT NULL, \`length\` int NOT NULL, \`registeredDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`bulb_lightning\``);
    }

}
