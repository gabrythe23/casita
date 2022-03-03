import { Module } from '@nestjs/common';
import { LightsController } from './lights.controller';
import { LightsService } from './lights.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SunriseSunsetEntity } from './entities/sunrise-sunset.entity';
import { BulbsLightning } from './entities/bulbs-lightning.entity';
import { ColorEntity } from './entities/color.entity';
import { MerossCloudService } from './meross-cloud.service';
import { BulbEntity } from './entities/bulb.entity';
import { MerossCloudController } from './meross-cloud.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SunriseSunsetEntity,
      BulbsLightning,
      ColorEntity,
      BulbEntity,
    ]),
  ],
  controllers: [LightsController, MerossCloudController],
  providers: [LightsService, MerossCloudService],
})
export class LightsModule {}
