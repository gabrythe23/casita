import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulbEntity } from '../entities/bulb.entity';
import { DeviceDefinition } from 'meross-cloud';
import { v4 } from 'uuid';
import { CasitaWatchWith, MerossBulbApiAction } from '../local/bulb/interfaces';
import { LightsService } from '../local/lights.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MerossCloudService {
  private readonly logger = new Logger(MerossCloudService.name);
  private watched: BulbEntity[] = [];

  constructor(
    @InjectRepository(BulbEntity)
    private bulbsEntityRepository: Repository<BulbEntity>,
    private lightService: LightsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    this.watched = await this.bulbsEntityRepository.find({
      where: { watchWith: CasitaWatchWith.CLOUD },
    });
  }

  async registerEvent(
    deviceId: string,
    action: MerossBulbApiAction,
    data: Record<string, any>,
  ) {
    const bulb: BulbEntity | undefined = this.watched.find(
      (r) => r.deviceId === deviceId,
    );
    if (bulb && action === MerossBulbApiAction.SET_POWER) {
      const togglex: { onoff: number } = data['togglex'][0];
      await this.lightService.generateState(
        bulb.commonName,
        togglex.onoff === 1,
      );
    }
  }

  async registerMerossCloudDevice(
    deviceId: string,
    deviceDef: DeviceDefinition,
  ): Promise<void> {
    let bulb: BulbEntity = await this.bulbsEntityRepository.findOne({
      where: { deviceId },
    });
    if (!bulb) {
      bulb = new BulbEntity();
      bulb.id = v4();
      bulb.deviceId = deviceId;
    }
    bulb.cloudName = deviceDef.devName;
    await this.bulbsEntityRepository.save(bulb);
  }
}
