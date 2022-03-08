import { LightsNightShiftService } from './lights-night-shift.service';
import { Controller, Logger } from '@nestjs/common';

@Controller('lights')
export class LightsController {
  private readonly logger = new Logger(LightsController.name);

  constructor(private service: LightsNightShiftService) {}
}
