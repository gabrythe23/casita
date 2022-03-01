import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { CasitaBulbsName } from '../bulb/interfaces';

@Entity({ name: 'bulb_state' })
export class BulbsStateEntity {
  @PrimaryColumn({
    length: 255,
  })
  id: string;
  @Column({ nullable: false })
  bulb: CasitaBulbsName;

  @Column({ default: false })
  isOn: boolean;

  @Column({})
  time: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  registeredDate: Date;
}
