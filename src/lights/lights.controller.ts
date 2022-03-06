import { LightsNightShiftService } from './lights-night-shift.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Controller, Logger } from '@nestjs/common';

@Controller('lights')
export class LightsController {
  private readonly logger = new Logger(LightsController.name);

  constructor(private service: LightsNightShiftService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async getSunriseSunset() {
    this.logger.log('Get Sunrise and Sunset for Today');
    await this.service.saveSunriseSunSet();
  }
}
