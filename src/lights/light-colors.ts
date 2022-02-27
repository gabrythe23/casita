import { MerossApiColor } from './interfaces';

const WHITE: MerossApiColor = {
  temperature: 95,
  rgb: 16711825,
  luminance: 100,
  capacity: 6,
};

const TANGERINE_50: MerossApiColor = {
  temperature: 1,
  rgb: 16755038,
  luminance: 100,
  capacity: 6,
};

const TANGERINE_100: MerossApiColor = {
  temperature: 1,
  rgb: 16755038,
  luminance: 100,
  capacity: 6,
};

const RED: MerossApiColor = {
  temperature: 1,
  rgb: 16711680,
  luminance: 98,
  capacity: 5,
};

export const LightColors = { WHITE, TANGERINE_50, TANGERINE_100, RED };
