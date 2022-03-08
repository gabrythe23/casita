// eslint-disable-next-line @typescript-eslint/no-var-requires
const API = require('meross-cloud');
import { Injectable, Logger } from '@nestjs/common';
import { DeviceDefinition } from 'meross-cloud';
import { MerossBulbApiAction } from '../local/bulb/interfaces';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeviceDataChange, DeviceInitialized } from './meross-cloud.interface';

@Injectable()
export class MerossCloudConnectorService {
  private readonly logger = new Logger(MerossCloudConnectorService.name);
  private meross: any;

  constructor(private eventEmitter: EventEmitter2) {
    this.meross = new API({
      email: 'gabrielepartiti@icloud.com',
      password: 'saluzzo2021',
      logger: this.logger.log,
      localHttpFirst: true,
    });
  }

  async onModuleInit() {
    this.buildMerossClient();
    this.meross.connect();
  }

  private buildMerossClient() {
    this.meross.on(
      'deviceInitialized',
      (deviceId: string, deviceDef: DeviceDefinition) =>
        this.eventEmitter.emit('meross_cloud.device_initialized', {
          deviceDef,
          deviceId,
        } as DeviceInitialized),
    );
    this.meross.on(
      'data',
      (
        deviceId: string,
        method: MerossBulbApiAction,
        data: Record<string, any>,
      ) =>
        this.eventEmitter.emit('meross_cloud.data', {
          method,
          data,
          deviceId,
        } as DeviceDataChange),
    );
  }
}
