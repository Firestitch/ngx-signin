import { SigninState } from '../enums/signin-state.enum';

export const SigninStates = [
  { name: 'Success', value: SigninState.Success },
  { name: 'Failure', value: SigninState.Failure },
  { name: 'Reset', value: SigninState.Reset },
  { name: 'Verification Requested', value: SigninState.VerificationRequested },
  { name: 'Verification Failed', value: SigninState.VerificationFailed },
  { name: 'Password Reset', value: SigninState.PasswordReset },
];
