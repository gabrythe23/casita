import { DeviceDefinition } from 'meross-cloud';
import { MerossBulbApiAction } from '../local/bulb/interfaces';

export interface DeviceInitialized {
  deviceId: string;
  deviceDef: DeviceDefinition;
}

export interface DeviceDataChange {
  deviceId: string;
  method: MerossBulbApiAction;
  data: Record<string, any>;
}
