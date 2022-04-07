import { SigninVerificationCodeState } from '../enums/signin-verification-code-state.enum';


export interface ISigninVerificationCode {
  id?: number;
  state?: SigninVerificationCodeState;
  createDate?: any;
  attempts?: number;
}


