export enum SigninState {
  Success = 'success',
  Failure = 'failure',
  Requested = 'requested',
  // Refused by a sign-in limit before any credential was checked
  Throttled = 'throttled',
}
