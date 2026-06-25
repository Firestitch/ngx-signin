import { SigninMethod } from '../enums/signin-method.enum';

export const SigninMethods = [
  { name: 'Email', value: SigninMethod.Email },
  { name: 'API', value: SigninMethod.Api },
  { name: 'Facebook', value: SigninMethod.Facebook },
  { name: 'Google', value: SigninMethod.Google },
  { name: 'SMS', value: SigninMethod.Sms },
  { name: 'App', value: SigninMethod.App },
];
