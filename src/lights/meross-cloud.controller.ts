import { MerossCloudService } from './meross-cloud.service';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('meross-cloud')
export class MerossCloudController {
  private readonly logger = new Logger(MerossCloudController.name);

  constructor(private service: MerossCloudService) {}

  @EventPattern('deviceInitialized')
  async checkNightShiftBathroom(payload:any) {
    this.logger.log('Checking lights...');
    // await this.service.registerMerossCloudDevice();
  }
}
