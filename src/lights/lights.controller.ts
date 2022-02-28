import { Controller, Logger } from '@nestjs/common';
import { LightsService } from './lights.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SunriseSunsetDate } from './bulb/interfaces';

@Controller('lights')
export class LightsController {
  private readonly logger = new Logger(LightsController.name);

  constructor(private service: LightsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async getSunriseSunset() {
    this.logger.log('Get Sunrise and Sunset for Today');
    await this.service.saveSunriseSunSet(SunriseSunsetDate.TODAY);
  }

  @Cron(CronExpression.EVERY_SECOND)
  async checkNightShiftBathroom() {
    this.logger.log('Checking lights...');
    await this.service.checkAllLights();
  }
}
