import { Controller, Logger } from '@nestjs/common';
import { MerossLocalService } from './meross-local.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('lights')
export class MerossLocalController {
  private readonly logger = new Logger(MerossLocalController.name);

  constructor(private service: MerossLocalService) {}

  @Cron(CronExpression.EVERY_SECOND)
  async checkNightShiftBathroom() {
    this.logger.log('Checking lights...');
    await this.service.checkAllLights();
  }
}
