import { Injectable, Logger } from '@nestjs/common';
import { Bulb } from './bulb';
import { InjectRepository } from '@nestjs/typeorm';
import { SunriseSunsetEntity } from './entities/sunrise-sunset.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import {
  CasitaBulbs,
  CasitaBulbsName,
  SunriseSunsetDate,
} from './bulb/interfaces';
import { v4 } from 'uuid';
import { BulbsLightning } from './entities/bulbs-lightning.entity';
import { ColorEntity, ColorScope } from './entities/color.entity';

const bedroom = new Bulb(CasitaBulbs.BEDROOM);
const bathroom = new Bulb(CasitaBulbs.BATHROOM);
const kitchen = new Bulb(CasitaBulbs.KITCHEN);
const studio = new Bulb(CasitaBulbs.STUDIO);

@Injectable()
export class LightsService {
  private readonly logger = new Logger(LightsService.name);

  constructor(
    @InjectRepository(SunriseSunsetEntity)
    private sunsetEntityRepository: Repository<SunriseSunsetEntity>,
    @InjectRepository(BulbsLightning)
    private bulbsLightningRepository: Repository<BulbsLightning>,
    @InjectRepository(ColorEntity)
    private colorEntityRepository: Repository<ColorEntity>,
  ) {}

  async onModuleInit() {
    this.logger.log('Initialization of LightService');
    await this.saveSunriseSunSet(SunriseSunsetDate.TODAY);
  }

  async checkAllLights(): Promise<void> {
    const color = await this.getNightShiftColor(
      await this.sunsetEntityRepository.findOneOrFail({
        order: { registeredDate: 'DESC' },
      }),
    );
    await Promise.all([
      this.checkLight(bedroom, color, CasitaBulbsName.BEDROOM),
      this.checkLight(bathroom, color, CasitaBulbsName.BATHROOM),
      this.checkLight(kitchen, color, CasitaBulbsName.KITCHEN),
      this.checkLight(studio, color, CasitaBulbsName.STUDIO),
    ]);
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
        await this.generateState(lightName, true);
        await light.setLightColor(color);
      }
    } else if (light.justDisconnected) {
      message += 'just disconnected';
      await this.generateState(lightName, false);
    } else message += 'off';
    this.logger.log(message);
  }

  private async generateState(
    bulb: CasitaBulbsName,
    isOn: boolean,
  ): Promise<void> {
    const lastBulbEvent: BulbsLightning =
      await this.bulbsLightningRepository.findOne({
        where: { bulb },
        order: { registeredDate: 'DESC' },
      });
    if (isOn && (!lastBulbEvent || lastBulbEvent.end)) {
      const bulbsLightning = new BulbsLightning(bulb);
      await this.bulbsLightningRepository.save(bulbsLightning);
    } else if (!isOn && lastBulbEvent.start) {
      lastBulbEvent.setEnd();
      await this.bulbsLightningRepository.save(lastBulbEvent);
    }
  }

  private async getNightShiftColor(
    sunriseSunset: SunriseSunsetEntity,
  ): Promise<ColorEntity> {
    let message = 'Color is ';
    const sunrise = LightsService.startEnd(sunriseSunset.sunrise);
    const sunset = LightsService.startEnd(sunriseSunset.sunset);
    const dayDate = new Date(sunriseSunset.sunset).getDate();
    const now = new Date().getTime();

    let scope: ColorScope;

    if (now > sunrise.end && now <= sunset.start) {
      message += ColorScope.MORNING;
      scope = ColorScope.MORNING;
    } else if (
      (now > sunset.start && now <= sunset.end) ||
      (now > sunrise.start && now <= sunrise.end)
    ) {
      message += ColorScope.BEFORE_SUNSET_SUNRISE;
      scope = ColorScope.BEFORE_SUNSET_SUNRISE;
    } else if (now > sunset.end && new Date(now).getDate() === dayDate) {
      message += ColorScope.AFTER_SUNSET;
      scope = ColorScope.AFTER_SUNSET;
    } else {
      message += ColorScope.NIGHT;
      scope = ColorScope.NIGHT;
    }
    this.logger.log(message);

    return await this.colorEntityRepository.findOneOrFail({ scope });
  }

  private static startEnd(date) {
    const oneHour = 3600 * 1000;
    date = new Date(date);
    return {
      start: new Date(date.getTime() - oneHour * 1.5).getTime(),
      end: date,
    };
  }

  async saveSunriseSunSet(
    date: SunriseSunsetDate = SunriseSunsetDate.TOMORROW,
  ): Promise<void> {
    const request = await axios.get(
      `https://api.sunrise-sunset.org/json?lat=44.644540&lng=7.492735&date=${date}&formatted=0`,
    );
    const sunriseSunset = new SunriseSunsetEntity();
    sunriseSunset.id = v4();
    sunriseSunset.sunset = new Date(request.data.results.sunset);
    sunriseSunset.sunrise = new Date(request.data.results.sunrise);
    await this.sunsetEntityRepository.save(sunriseSunset);
  }
}
