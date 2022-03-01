import {MigrationInterface, QueryRunner} from "typeorm";

export class init1646157460563 implements MigrationInterface {
    name = 'init1646157460563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bulb_state\` (\`id\` varchar(255) NOT NULL, \`bulb\` varchar(255) NOT NULL, \`isOn\` tinyint NOT NULL DEFAULT 0, \`time\` datetime NOT NULL, \`registeredDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sunrise_sunset\` (\`id\` varchar(255) NOT NULL, \`sunrise\` datetime NOT NULL, \`sunset\` datetime NOT NULL, \`registeredDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`sunrise_sunset\``);
        await queryRunner.query(`DROP TABLE \`bulb_state\``);
    }

}
