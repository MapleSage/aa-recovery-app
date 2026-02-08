import { verifyRegistrationResponse } from '@simplewebauthn/server';
import type { RegistrationResponseJSON } from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth/options';
import { ensureAuthUser, upsertPasskey } from '@/lib/auth/passkey-store';
import {
  getWebAuthnOrigins,
  getWebAuthnRPID,
  WEBAUTHN_REGISTER_CHALLENGE_COOKIE,
} from '@/lib/auth/webauthn-config';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { credential } = (await request.json()) as { credential?: RegistrationResponseJSON };
  if (!credential) {
    return NextResponse.json({ error: 'Missing credential payload' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const challenge = cookieStore.get(WEBAUTHN_REGISTER_CHALLENGE_COOKIE)?.value;

  if (!challenge) {
    return NextResponse.json({ error: 'Registration challenge not found' }, { status: 400 });
  }

  const user = await ensureAuthUser({
    email: session.user.email,
    name: session.user.name,
  });

  const verification = await verifyRegistrationResponse({
    response: credential,
    expectedChallenge: challenge,
    expectedOrigin: getWebAuthnOrigins(),
    expectedRPID: getWebAuthnRPID(),
    requireUserVerification: false,
  });

  if (!verification.verified || !verification.registrationInfo) {
    return NextResponse.json({ verified: false }, { status: 400 });
  }

  const {
    credential: { id: credentialID, publicKey: credentialPublicKey, counter },
  } = verification.registrationInfo;

  await upsertPasskey({
    userId: user.id,
    credentialId: credentialID,
    publicKey: isoBase64URL.fromBuffer(credentialPublicKey),
    counter,
    transports: credential.response.transports,
  });

  const response = NextResponse.json({ verified: true });
  response.cookies.set({
    name: WEBAUTHN_REGISTER_CHALLENGE_COOKIE,
    value: '',
    maxAge: 0,
    path: '/',
  });

  return response;
}
