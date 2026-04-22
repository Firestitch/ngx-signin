import { DeviceBrowser, DeviceOs, DevicePlatform, DeviceType } from '@firestitch/device';


export interface ISigninDevice {
  readonly id: number;
  platform?: DevicePlatform;
  type: DeviceType;
  osType: DeviceOs;
  osVersion: string;
  browserType: DeviceBrowser;
  browserVersion: string;
  userAgent: string;
}
