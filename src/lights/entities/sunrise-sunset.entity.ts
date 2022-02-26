import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sunrise_sunset' })
export class SunriseSunsetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  sunrise: number;

  @Column({ default: false })
  sunset: number;

  @CreateDateColumn({
    type: 'date',
    default: () => "datetime('now','localtime')",
  })
  registeredDate: Date;
}
