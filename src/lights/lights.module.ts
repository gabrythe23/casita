import { Module } from '@nestjs/common';
import { LightsController } from './local/lights.controller';
import { LightsService } from './local/lights.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SunriseSunsetEntity } from './entities/sunrise-sunset.entity';
import { BulbsLightning } from './entities/bulbs-lightning.entity';
import { ColorEntity } from './entities/color.entity';
import { MerossCloudService } from './cloud/meross-cloud.service';
import { BulbEntity } from './entities/bulb.entity';
import { MerossCloudController } from './cloud/meross-cloud.controller';
import { MerossCloudConnectorService } from './cloud/meross-cloud-connector.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([
      SunriseSunsetEntity,
      BulbsLightning,
      ColorEntity,
      BulbEntity,
    ]),
  ],
  controllers: [LightsController, MerossCloudController],
  providers: [LightsService, MerossCloudService, MerossCloudConnectorService],
})
export class LightsModule {}
