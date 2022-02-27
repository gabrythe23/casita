import { Module } from '@nestjs/common';
import { LightsController } from './lights.controller';
import { LightsService } from './lights.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SunriseSunsetEntity } from './entities/sunrise-sunset.entity';
import { BulbsStateEntity } from './entities/bulbs-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SunriseSunsetEntity, BulbsStateEntity])],
  controllers: [LightsController],
  providers: [LightsService],
})
export class LightsModule {}
