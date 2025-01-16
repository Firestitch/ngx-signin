import { SigninState } from '../enums/signin-state.enum';

export const SigninStates = [
  { name: 'Success', value: SigninState.Success },
  { name: 'Failure', value: SigninState.Failure },
  { name: 'Reset', value: SigninState.Reset },
  { name: 'Verification requested', value: SigninState.VerificationRequested },
  { name: 'Verification failed', value: SigninState.VerificationFailed },
  { name: 'Password reset', value: SigninState.PasswordReset },
];
