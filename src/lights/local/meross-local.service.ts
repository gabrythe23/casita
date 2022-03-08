import { Injectable, Logger } from '@nestjs/common';
import { Bulb } from './bulb';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CasitaBulbsName, CasitaWatchWith } from './bulb/interfaces';
import { BulbsLightning } from '../entities/bulbs-lightning.entity';
import { ColorEntity } from '../entities/color.entity';
import { BulbEntity } from '../entities/bulb.entity';
import { LightsService } from '../lights.service';
import { LightsNightShiftService } from '../lights-night-shift.service';
import { getSunrise, getSunset } from 'sunrise-sunset-js';

@Injectable()
export class MerossLocalService {
  private readonly logger = new Logger(MerossLocalService.name);
  private watched: Partial<Record<CasitaBulbsName, Bulb>> = {};

  constructor(
    @InjectRepository(BulbsLightning)
    private bulbsLightningRepository: Repository<BulbsLightning>,
    @InjectRepository(ColorEntity)
    private colorEntityRepository: Repository<ColorEntity>,
    @InjectRepository(BulbEntity)
    private bulbsEntityRepository: Repository<BulbEntity>,
    private lightsService: LightsService,
    private lightsNightShiftService: LightsNightShiftService,
  ) {}

  async onModuleInit() {
    this.logger.log('Initialization of LightService');
    await this.setWatched();
  }

  private async setWatched() {
    const watched: BulbEntity[] = await this.bulbsEntityRepository.find({
      where: { watchWith: CasitaWatchWith.LOCAL },
    });
    for (const watch of watched) {
      this.watched[watch.commonName] = new Bulb(watch.ip);
    }
  }

  async checkAllLights(): Promise<void> {
    const color = await this.lightsNightShiftService.getNightShiftColor({
      sunrise: new Date(getSunrise(44.64671, 7.49309)),
      sunset: new Date(getSunset(44.64671, 7.49309)),
    });
    const checkLights = [];
    for (const [key, value] of Object.entries(this.watched)) {
      checkLights.push(this.checkLight(value, color, key as CasitaBulbsName));
    }
    await Promise.all(checkLights);
  }

  async checkLight(
    light: Bulb,
    color: ColorEntity,
    lightName: CasitaBulbsName,
  ): Promise<void> {
    let message = `${lightName} is `;
    await light.getState();

    if (light.isConnected) {
      message += `on `;
      if (light.firstConnection) {
        message += 'for the first time';
        await this.lightsService.generateState(lightName, true);
        await light.setLightColor(color);
      }
    } else if (light.justDisconnected) {
      message += 'just disconnected';
      await this.lightsService.generateState(lightName, false);
    } else message += 'off';
    this.logger.log(message);
  }
}
