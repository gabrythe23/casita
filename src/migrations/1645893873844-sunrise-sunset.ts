import {MigrationInterface, QueryRunner} from "typeorm";

export class sunriseSunset1645893873844 implements MigrationInterface {
    name = 'sunriseSunset1645893873844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sunrise_sunset" ("id" varchar PRIMARY KEY NOT NULL, "sunrise" integer NOT NULL, "sunset" integer NOT NULL DEFAULT (0), "registeredDate" date NOT NULL DEFAULT (datetime('now','localtime')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sunrise_sunset"`);
    }

}
