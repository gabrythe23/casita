import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { CasitaBulbsName, CasitaWatchWith } from '../bulb/interfaces';

@Entity({ name: 'bulbs' })
export class BulbEntity {
  @PrimaryColumn({
    length: 255,
  })
  id: string;

  @Column({ nullable: false })
  deviceId: string;

  @Column({ nullable: false })
  cloudName: string;

  @Column({ nullable: true })
  commonName: CasitaBulbsName;

  @Column({
    type: 'enum',
    enum: CasitaWatchWith,
  })
  watchWith: CasitaWatchWith;

  @Column({ nullable: true })
  ip: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  registeredDate: Date;
}
