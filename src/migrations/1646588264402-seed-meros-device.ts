import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedMerosDevice1646588264402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO `bulbs` (`id`, `deviceId`, `cloudName`, `commonName`, `registeredDate`, `watchWith`, `ip`) VALUES ('072aca09-2510-4917-acc9-1b8f8c2674cd', '20121520632624290d2648e1e9412ed4', 'Lampada studio', 'STUDIO', '2022-03-06 13:46:41.566367', 'LOCAL', '192.168.1.5');",
    );
    await queryRunner.query(
      "INSERT INTO `bulbs` (`id`, `deviceId`, `cloudName`, `commonName`, `registeredDate`, `watchWith`, `ip`) VALUES ('54524866-1f69-4f4c-910d-d8a7ecea1807', '20101977613282290d0448e1e935f535', 'lampada sala', 'LIVING_ROOM', '2022-03-06 13:46:41.567612', 'CLOUD', '192.168.1.249');",
    );
    await queryRunner.query(
      "INSERT INTO `bulbs` (`id`, `deviceId`, `cloudName`, `commonName`, `registeredDate`, `watchWith`, `ip`) VALUES ('64fbdbd6-f595-43d8-b0e8-723d600c7a84', '20121533547353290d2648e1e9414977', 'Lampadario Cucina', 'KITCHEN', '2022-03-06 13:46:41.548228', 'LOCAL', '192.168.1.85');",
    );
    await queryRunner.query(
      "INSERT INTO `bulbs` (`id`, `deviceId`, `cloudName`, `commonName`, `registeredDate`, `watchWith`, `ip`) VALUES ('8a2148ae-2cf7-47b0-b896-86a4756980c7', '20121585405119290d2648e1e9414f59', 'Lampadario Camera da Letto', 'BEDROOM', '2022-03-06 13:46:41.595903', 'LOCAL', '192.168.1.234');",
    );
    await queryRunner.query(
      "INSERT INTO `bulbs` (`id`, `deviceId`, `cloudName`, `commonName`, `registeredDate`, `watchWith`, `ip`) VALUES ('be738784-fb54-40d4-ae1a-525afad60073', '20121592543363290d2648e1e9417180', 'Lampadario Bagno', 'BATHROOM', '2022-03-06 13:46:41.294360', 'LOCAL', '192.168.1.191');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
