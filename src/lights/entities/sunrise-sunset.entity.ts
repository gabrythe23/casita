import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sunrise_sunset' })
export class SunriseSunsetEntity {
  @PrimaryColumn({
    length: 255,
  })
  id: string;

  @Column({ nullable: false })
  sunrise: Date;

  @Column({ nullable: false })
  sunset: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  registeredDate: Date;
}
