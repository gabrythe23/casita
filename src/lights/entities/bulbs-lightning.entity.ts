import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { CasitaBulbsName } from '../local/bulb/interfaces';
import { v4 } from 'uuid';

@Entity({ name: 'bulb_lightning' })
export class BulbsLightning {
  @PrimaryColumn({
    length: 255,
  })
  id: string;

  @Column({ nullable: false })
  bulb: CasitaBulbsName;

  @Column()
  start: Date;

  @Column({ nullable: true })
  end: Date;

  @Column({ nullable: true })
  length: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  registeredDate: Date;

  constructor(bulb: CasitaBulbsName) {
    if (bulb) {
      this.id = v4();
      this.bulb = bulb;
      this.start = new Date();
    }
  }

  setEnd() {
    this.end = new Date();
    this.length = this.end.getTime() - new Date(this.start).getTime();
  }
}
