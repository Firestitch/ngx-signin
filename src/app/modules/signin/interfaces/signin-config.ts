import { Observable } from 'rxjs';


export interface SigninConfig {
  emailChanged?: () => Observable<any>;
  beforeProcessSignin?: (response) => Observable<any>;
  processSignin?: (response, redirect?) => Observable<any>;
  afterProcessSignin?: (response) => Observable<any>;
  showSocialSignins?: boolean;
  trustedDeviceExpiryDays?: number;
  signinMeta?: () => Observable<{[key: string]: any}>;
  signinTitle?: string;
  signinSubtitle?: string;
  verificationCodeLength?: number;
  signinUrl?: string;
  signinVerifyUrl?: string;
  signinExistsUrl?: string;
}
