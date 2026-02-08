import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { AuthenticatorTransportFuture } from '@simplewebauthn/server';
import { NextResponse } from 'next/server';

import { getUserByEmail, listPasskeysByUserId } from '@/lib/auth/passkey-store';
import {
  getWebAuthnRPID,
  WEBAUTHN_AUTH_CHALLENGE_COOKIE,
} from '@/lib/auth/webauthn-config';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { email?: string };

  let allowCredentials: Array<{ id: string; transports?: AuthenticatorTransportFuture[] }> = [];

  if (body.email) {
    const user = await getUserByEmail(body.email);
    if (user) {
      const passkeys = await listPasskeysByUserId(user.id);
      allowCredentials = passkeys.map((passkey) => ({
        id: passkey.credentialId,
        transports: passkey.transports,
      }));
    }
  }

  const options = await generateAuthenticationOptions({
    rpID: getWebAuthnRPID(),
    userVerification: 'preferred',
    timeout: 60_000,
    allowCredentials,
  });

  const response = NextResponse.json(options);
  response.cookies.set({
    name: WEBAUTHN_AUTH_CHALLENGE_COOKIE,
    value: options.challenge,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 5,
  });

  return response;
}
