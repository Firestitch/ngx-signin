import { SigninType } from '../enums/signin-type.enum';

export const SigninTypes = [
  { name: 'Authentication', value: SigninType.Authentication },
  { name: 'One-time password', value: SigninType.OneTimePassword },
  { name: 'Password reset', value: SigninType.PasswordReset },
  { name: 'Verification', value: SigninType.Verification },
];
