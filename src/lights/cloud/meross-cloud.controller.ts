import { MerossCloudService } from './meross-cloud.service';
import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DeviceDataChange, DeviceInitialized } from './meross-cloud.interface';

@Controller('meross-cloud')
export class MerossCloudController {
  private readonly logger = new Logger(MerossCloudController.name);

  constructor(private service: MerossCloudService) {}

  @OnEvent('meross_cloud.device_initialized')
  async deviceInitialized(msg: DeviceInitialized) {
    this.logger.log('device initialized');
    await this.service.registerMerossCloudDevice(msg.deviceId, msg.deviceDef);
  }

  @OnEvent('meross_cloud.data')
  async deviceChangeData(msg: DeviceDataChange) {
    this.logger.log('device change data');
    await this.service.registerEvent(msg.deviceId, msg.method, msg.data);
  }
}
