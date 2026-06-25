/**
 * Prepended to the password when signing in with a one-time code, so the
 * backend can classify the attempt as an explicit one-time password through the
 * shared sign-in endpoint. Must match SigninModel::ONE_TIME_PASSWORD_PREFIX.
 */
export const ONE_TIME_PASSWORD_PREFIX = 'OTP:';
