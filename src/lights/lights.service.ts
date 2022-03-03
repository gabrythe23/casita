import { Injectable } from '@nestjs/common';
import { CasitaBulbsName } from './local/bulb/interfaces';
import { BulbsLightning } from './entities/bulbs-lightning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LightsService {
  constructor(
    @InjectRepository(BulbsLightning)
    private bulbsLightningRepository: Repository<BulbsLightning>,
  ) {}

  async generateState(bulb: CasitaBulbsName, isOn: boolean): Promise<void> {
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
}
