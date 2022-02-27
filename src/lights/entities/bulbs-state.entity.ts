import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CasitaBulbsName } from '../bulb/interfaces';

@Entity({ name: 'bulb_state' })
export class BulbsStateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  bulb: CasitaBulbsName;

  @Column({ default: false })
  isOn: boolean;

  @Column({})
  time: number;

  @CreateDateColumn({
    type: 'date',
    default: () => "datetime('now','localtime')",
  })
  registeredDate: Date;
}
