import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BulbsLightning } from './entities/bulbs-lightning.entity';
import { SunriseSunsetEntity } from './entities/sunrise-sunset.entity';
import { ColorEntity, ColorScope } from './entities/color.entity';
import { Repository } from 'typeorm';
import { CasitaBulbsName } from './local/bulb/interfaces';
import { Bulb } from './local/bulb';
import { BulbEntity } from './entities/bulb.entity';
import { LightsService } from './lights.service';
import { v4 } from 'uuid';
import { getSunrise, getSunset } from 'sunrise-sunset-js';

@Injectable()
export class LightsNightShiftService {
  private readonly logger = new Logger(LightsNightShiftService.name);
  private watched: Partial<Record<CasitaBulbsName, Bulb>> = {};

  constructor(
    @InjectRepository(SunriseSunsetEntity)
    private sunsetEntityRepository: Repository<SunriseSunsetEntity>,
    @InjectRepository(BulbsLightning)
    private bulbsLightningRepository: Repository<BulbsLightning>,
    @InjectRepository(ColorEntity)
    private colorEntityRepository: Repository<ColorEntity>,
    @InjectRepository(BulbEntity)
    private bulbsEntityRepository: Repository<BulbEntity>,
    private lightsService: LightsService,
  ) {}

  async onModuleInit() {
    this.logger.log('Initialization of LightsNightShiftService');
    await this.saveSunriseSunSet();
  }

  async getNightShiftColor(
    sunriseSunset: SunriseSunsetEntity,
  ): Promise<ColorEntity> {
    let message = 'Color is ';
    const sunrise = LightsNightShiftService.startEnd(sunriseSunset.sunrise);
    const sunset = LightsNightShiftService.startEnd(sunriseSunset.sunset);
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

  async saveSunriseSunSet(): Promise<void> {
    const sunriseSunset = new SunriseSunsetEntity();
    sunriseSunset.id = v4();
    sunriseSunset.sunset = getSunset(44.64671, 7.49309);
    sunriseSunset.sunrise = getSunrise(44.64671, 7.49309);
    await this.sunsetEntityRepository.save(sunriseSunset);
  }
}
