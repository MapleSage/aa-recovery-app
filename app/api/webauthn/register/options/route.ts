import { generateRegistrationOptions } from '@simplewebauthn/server';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth/options';
import { ensureAuthUser, listPasskeysByUserId } from '@/lib/auth/passkey-store';
import {
  getWebAuthnRPID,
  getWebAuthnRPName,
  WEBAUTHN_REGISTER_CHALLENGE_COOKIE,
} from '@/lib/auth/webauthn-config';

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await ensureAuthUser({
    email: session.user.email,
    name: session.user.name,
  });

  const passkeys = await listPasskeysByUserId(user.id);

  const options = await generateRegistrationOptions({
    rpName: getWebAuthnRPName(),
    rpID: getWebAuthnRPID(),
    userName: user.email,
    userDisplayName: user.name || user.email,
    userID: new TextEncoder().encode(user.id),
    attestationType: 'none',
    timeout: 60_000,
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    },
    excludeCredentials: passkeys.map((passkey) => ({
      id: passkey.credentialId,
      transports: passkey.transports,
    })),
    supportedAlgorithmIDs: [-7, -257],
  });

  const response = NextResponse.json(options);
  response.cookies.set({
    name: WEBAUTHN_REGISTER_CHALLENGE_COOKIE,
    value: options.challenge,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 5,
  });

  return response;
}
