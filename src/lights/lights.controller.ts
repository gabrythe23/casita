import { LightsNightShiftService } from './lights-night-shift.service';
import { SunriseSunsetDate } from './local/bulb/interfaces';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Controller, Logger } from '@nestjs/common';

@Controller('lights')
export class LightsController {
  private readonly logger = new Logger(LightsController.name);

  constructor(private service: LightsNightShiftService) {}

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async getSunriseSunset() {
    this.logger.log('Get Sunrise and Sunset for Today');
    await this.service.saveSunriseSunSet(SunriseSunsetDate.TOMORROW);
  }
}
