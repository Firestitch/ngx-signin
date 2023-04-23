import { of } from 'rxjs';

import { SigninConfig } from '../interfaces';

export function signinConfig(rootConfig: SigninConfig, config: SigninConfig) {
  return {
    emailChanged: rootConfig?.emailChanged || config?.emailChanged || (() => of(true)),
    beforeProcessSignin: config?.beforeProcessSignin || rootConfig?.beforeProcessSignin || ((response) => of(response)),
    processSignin: config?.processSignin || rootConfig?.processSignin || ((response) => of(response)),
    afterProcessSignin: config?.afterProcessSignin || rootConfig?.afterProcessSignin || ((response) => of(response)),
    showSocialSignins: config?.showSocialSignins || (rootConfig?.showSocialSignins ?? true),
    trustedDeviceExpiryDays: config?.trustedDeviceExpiryDays || rootConfig?.trustedDeviceExpiryDays || 0,
    signinMeta: config?.signinMeta ? config.signinMeta : () => ({}),
  };
}
