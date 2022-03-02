export enum CasitaBulbsName {
  BEDROOM = 'BEDROOM',
  KITCHEN = 'KITCHEN',
  BATHROOM = 'BATHROOM',
  STUDIO = 'STUDIO',
  LIVING_ROOM = 'LIVING_ROOM',
}

export enum CasitaBulbs {
  BEDROOM = '192.168.1.234',
  KITCHEN = '192.168.1.85',
  BATHROOM = '192.168.1.191',
  STUDIO = '192.168.1.5',
  LIVING_ROOM = '192.168.1.249',
}

export enum MerossBulbApiAction {
  SYSTEM_ALL = 'Appliance.System.All',
  SET_COLOR = 'Appliance.Control.Light',
  SET_POWER = 'Appliance.Control.ToggleX',
  GET_ = 'Appliance.Control.ToggleX',
}

export enum MerossApiMethod {
  GET = 'GET',
  SET = 'SET',
}

export enum SunriseSunsetDate {
  TOMORROW = 'tomorrow',
  TODAY = 'today',
}
