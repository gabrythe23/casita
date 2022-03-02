import { Module } from '@nestjs/common';
import { LightsController } from './lights.controller';
import { LightsService } from './lights.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SunriseSunsetEntity } from './entities/sunrise-sunset.entity';
import { BulbsLightning } from './entities/bulbs-lightning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SunriseSunsetEntity, BulbsLightning])],
  controllers: [LightsController],
  providers: [LightsService],
})
export class LightsModule {}
