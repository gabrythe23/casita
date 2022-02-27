import {MigrationInterface, QueryRunner} from "typeorm";

export class addBulbState1645957424217 implements MigrationInterface {
    name = 'addBulbState1645957424217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bulb_state" ("id" varchar PRIMARY KEY NOT NULL, "bulb" varchar NOT NULL, "isOn" boolean NOT NULL DEFAULT (0), "time" integer NOT NULL, "registeredDate" date NOT NULL DEFAULT (datetime('now','localtime')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bulb_state"`);
    }

}
