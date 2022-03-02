import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export enum ColorScope {
  MORNING = 'MORNING',
  BEFORE_SUNSET_SUNRISE = 'BEFORE_SUNSET_SUNRISE',
  AFTER_SUNSET = 'AFTER_SUNSET',
  NIGHT = 'NIGHT',
}

@Entity({ name: 'colors' })
export class ColorEntity {
  @PrimaryColumn({
    length: 255,
  })
  id: string;

  @Column({
    type: 'enum',
    enum: ColorScope,
  })
  scope: ColorScope;

  @Column({ nullable: false })
  temperature: number;

  @Column({ nullable: false })
  rgb: number;

  @Column({ nullable: false })
  luminance: number;

  @Column({ nullable: false })
  capacity: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  registeredDate: Date;
}
