import { SigninVerificationCodeState } from '../enums/signin-verification-code-state.enum';

export const SigninVerificationCodeStates = [
  { name: 'Active', value: SigninVerificationCodeState.Active },
  { name: 'Deleted', value: SigninVerificationCodeState.Deleted },
  { name: 'Used', value: SigninVerificationCodeState.Used },
  { name: 'Failed', value: SigninVerificationCodeState.Failed },
  { name: 'Invalidated', value: SigninVerificationCodeState.Invalidated },
];

