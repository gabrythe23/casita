import { Module } from '@nestjs/common';
import { MerossLocalController } from './local/meross-local.controller';
import { MerossLocalService } from './local/meross-local.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SunriseSunsetEntity } from './entities/sunrise-sunset.entity';
import { BulbsLightning } from './entities/bulbs-lightning.entity';
import { ColorEntity } from './entities/color.entity';
import { MerossCloudService } from './cloud/meross-cloud.service';
import { BulbEntity } from './entities/bulb.entity';
import { MerossCloudController } from './cloud/meross-cloud.controller';
import { MerossCloudConnectorService } from './cloud/meross-cloud-connector.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LightsService } from './lights.service';
import { LightsNightShiftService } from './lights-night-shift.service';

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
  controllers: [MerossLocalController, MerossCloudController],
  providers: [
    MerossLocalService,
    MerossCloudService,
    MerossCloudConnectorService,
    LightsService,
    LightsNightShiftService,
  ],
})
export class LightsModule {}
