export const WEBAUTHN_REGISTER_CHALLENGE_COOKIE = 'webauthn-register-challenge';
export const WEBAUTHN_AUTH_CHALLENGE_COOKIE = 'webauthn-auth-challenge';

export function getWebAuthnRPID(): string {
  if (process.env.PASSKEY_RP_ID) {
    return process.env.PASSKEY_RP_ID;
  }

  if (process.env.NEXTAUTH_URL) {
    return new URL(process.env.NEXTAUTH_URL).hostname;
  }

  return 'localhost';
}

export function getWebAuthnOrigins(): string[] {
  const configured = process.env.PASSKEY_EXPECTED_ORIGINS
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (configured && configured.length > 0) {
    return configured;
  }

  const origins = new Set<string>();

  if (process.env.NEXTAUTH_URL) {
    origins.add(process.env.NEXTAUTH_URL);
  }

  origins.add('http://localhost:3000');
  origins.add('https://localhost:3000');

  return [...origins];
}

export function getWebAuthnRPName(): string {
  return process.env.PASSKEY_RP_NAME || 'AA Recovery';
}
