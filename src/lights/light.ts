import { createHash } from 'crypto';
import axios from 'axios';
import {
  CasitaBulbs,
  MerossApiColor,
  MerossApiMethod,
  MerossBulbApiAction,
} from './interfaces';

export class Light {
  private readonly key = '2fb5b4f961e53fb76b6736c77cae6c05';
  readonly address: string;
  isConnected = false;
  isOn = false;
  firstConnection = false;

  static WHITE: MerossApiColor = {
    temperature: 95,
    rgb: 16711825,
    luminance: 100,
    capacity: 6,
  };

  static TANGERINE_50: MerossApiColor = {
    temperature: 1,
    rgb: 16755038,
    luminance: 100,
    capacity: 6,
  };

  static TANGERINE_100: MerossApiColor = {
    temperature: 1,
    rgb: 16755038,
    luminance: 100,
    capacity: 6,
  };

  static RED: MerossApiColor = {
    temperature: 1,
    rgb: 16711680,
    luminance: 98,
    capacity: 5,
  };

  constructor(address: CasitaBulbs) {
    this.address = address;
  }

  _sendRequest(
    method: MerossApiMethod,
    namespace: MerossBulbApiAction,
    payload: Record<string, any>,
  ) {
    const url = `http://${this.address}/config`;
    return axios.post(
      url,
      {
        header: this.generateHeader(url, method, namespace),
        payload,
      },
      { timeout: 1000 },
    );
  }

  private generateHeader(
    from: string,
    method: string,
    namespace: string,
  ): Record<string, string | number> {
    const timestamp = Math.floor(Date.now() / 1000);
    const messageId = createHash('md5').update(`${timestamp}`).digest('hex');
    const signKey = createHash('md5')
      .update(messageId + this.key + timestamp)
      .digest('hex');

    return {
      messageId,
      method,
      from,
      sign: signKey,
      namespace,
      timestamp,
      payloadVersion: 1,
    };
  }

  async getState(): Promise<Record<string, any> | undefined> {
    let res: Record<string, any> | undefined;
    try {
      const resp = await this._sendRequest(
        MerossApiMethod.GET,
        MerossBulbApiAction.SYSTEM_ALL,
        {},
      );
      this.firstConnection = !this.isConnected;
      this.isConnected = true;
      res = resp.data;
    } catch (err) {
      this.isConnected = false;
      res = undefined;
    }
    return res;
  }

  async setLightColor(payload: MerossApiColor, channel = 0) {
    const resp = await this._sendRequest(
      MerossApiMethod.SET,
      MerossBulbApiAction.SET_COLOR,
      {
        light: {
          ...payload,
          channel,
        },
      },
    );

    return resp.data;
  }

  async setPower(power: boolean, channel = 0) {
    const resp = await this._sendRequest(
      MerossApiMethod.SET,
      MerossBulbApiAction.SET_POWER,
      {
        togglex: {
          onoff: power ? 1 : 0,
          channel,
        },
      },
    );

    return resp.data;
  }

  async getPower() {
    const resp = await this._sendRequest(
      MerossApiMethod.GET,
      MerossBulbApiAction.SET_POWER,
      {},
    );

    return resp.data;
  }

  async turnOn(channel = 0) {
    return this.setPower(true, channel);
  }

  async turnOff(channel = 0) {
    return this.setPower(false, channel);
  }
}
