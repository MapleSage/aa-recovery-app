import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import type {
  AuthenticationResponseJSON,
  AuthenticatorTransportFuture,
} from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';

import { getContainer } from '@/lib/cosmos';
import { getWebAuthnOrigins, getWebAuthnRPID } from '@/lib/auth/webauthn-config';

const AUTH_USERS_CONTAINER = 'auth-users';
const PASSKEYS_CONTAINER = 'auth-passkeys';

type StoredAuthUser = {
  id: string;
  type: 'auth-user';
  userId: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
};

type StoredPasskey = {
  id: string;
  type: 'auth-passkey';
  userId: string;
  credentialId: string;
  publicKey: string;
  counter: number;
  transports?: AuthenticatorTransportFuture[];
  createdAt: string;
  updatedAt: string;
};

export type AuthUserRecord = {
  id: string;
  email: string;
  name?: string;
};

export type PasskeyRecord = {
  id: string;
  userId: string;
  credentialId: string;
  publicKey: string;
  counter: number;
  transports?: AuthenticatorTransportFuture[];
};

const memoryUsers = new Map<string, StoredAuthUser>();
const memoryPasskeys = new Map<string, StoredPasskey>();

function cosmosConfigured(): boolean {
  return Boolean(process.env.COSMOS_ENDPOINT && process.env.COSMOS_KEY);
}

function nowISO(): string {
  return new Date().toISOString();
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function mapUser(user: StoredAuthUser): AuthUserRecord {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

function mapPasskey(passkey: StoredPasskey): PasskeyRecord {
  return {
    id: passkey.id,
    userId: passkey.userId,
    credentialId: passkey.credentialId,
    publicKey: passkey.publicKey,
    counter: passkey.counter,
    transports: passkey.transports,
  };
}

async function getUserByEmailFromCosmos(email: string): Promise<StoredAuthUser | null> {
  const container = await getContainer(AUTH_USERS_CONTAINER);
  const query = {
    query: 'SELECT TOP 1 * FROM c WHERE c.type = @type AND c.email = @email',
    parameters: [
      { name: '@type', value: 'auth-user' },
      { name: '@email', value: normalizeEmail(email) },
    ],
  };

  const { resources } = await container.items.query<StoredAuthUser>(query).fetchAll();
  return resources[0] || null;
}

async function getUserByEmailFromMemory(email: string): Promise<StoredAuthUser | null> {
  const normalized = normalizeEmail(email);
  for (const user of memoryUsers.values()) {
    if (user.email === normalized) {
      return user;
    }
  }
  return null;
}

export async function getUserByEmail(email: string): Promise<AuthUserRecord | null> {
  const user = cosmosConfigured()
    ? await getUserByEmailFromCosmos(email)
    : await getUserByEmailFromMemory(email);

  return user ? mapUser(user) : null;
}

export async function ensureAuthUser(params: {
  email: string;
  name?: string | null;
}): Promise<AuthUserRecord> {
  const normalizedEmail = normalizeEmail(params.email);
  const existing = await getUserByEmail(normalizedEmail);

  if (existing) {
    return existing;
  }

  const createdAt = nowISO();
  const newUser: StoredAuthUser = {
    id: crypto.randomUUID(),
    type: 'auth-user',
    userId: crypto.randomUUID(),
    email: normalizedEmail,
    name: params.name || undefined,
    createdAt,
    updatedAt: createdAt,
  };

  newUser.userId = newUser.id;

  if (cosmosConfigured()) {
    const container = await getContainer(AUTH_USERS_CONTAINER);
    await container.items.upsert(newUser);
  } else {
    memoryUsers.set(newUser.id, newUser);
  }

  return mapUser(newUser);
}

async function listPasskeysByUserIdFromCosmos(userId: string): Promise<StoredPasskey[]> {
  const container = await getContainer(PASSKEYS_CONTAINER);
  const query = {
    query: 'SELECT * FROM c WHERE c.type = @type AND c.userId = @userId',
    parameters: [
      { name: '@type', value: 'auth-passkey' },
      { name: '@userId', value: userId },
    ],
  };

  const { resources } = await container.items.query<StoredPasskey>(query).fetchAll();
  return resources;
}

async function listPasskeysByUserIdFromMemory(userId: string): Promise<StoredPasskey[]> {
  return [...memoryPasskeys.values()].filter((passkey) => passkey.userId === userId);
}

export async function listPasskeysByUserId(userId: string): Promise<PasskeyRecord[]> {
  const passkeys = cosmosConfigured()
    ? await listPasskeysByUserIdFromCosmos(userId)
    : await listPasskeysByUserIdFromMemory(userId);

  return passkeys.map(mapPasskey);
}

async function getPasskeyByCredentialIdFromCosmos(
  credentialId: string,
): Promise<StoredPasskey | null> {
  const container = await getContainer(PASSKEYS_CONTAINER);
  const query = {
    query: 'SELECT TOP 1 * FROM c WHERE c.type = @type AND c.credentialId = @credentialId',
    parameters: [
      { name: '@type', value: 'auth-passkey' },
      { name: '@credentialId', value: credentialId },
    ],
  };

  const { resources } = await container.items.query<StoredPasskey>(query).fetchAll();
  return resources[0] || null;
}

async function getPasskeyByCredentialIdFromMemory(
  credentialId: string,
): Promise<StoredPasskey | null> {
  for (const passkey of memoryPasskeys.values()) {
    if (passkey.credentialId === credentialId) {
      return passkey;
    }
  }
  return null;
}

async function getPasskeyByCredentialId(credentialId: string): Promise<StoredPasskey | null> {
  return cosmosConfigured()
    ? getPasskeyByCredentialIdFromCosmos(credentialId)
    : getPasskeyByCredentialIdFromMemory(credentialId);
}

export async function upsertPasskey(params: {
  userId: string;
  credentialId: string;
  publicKey: string;
  counter: number;
  transports?: AuthenticatorTransportFuture[];
}): Promise<void> {
  const timestamp = nowISO();
  const existing = await getPasskeyByCredentialId(params.credentialId);

  const passkey: StoredPasskey = {
    id: existing?.id || crypto.randomUUID(),
    type: 'auth-passkey',
    userId: params.userId,
    credentialId: params.credentialId,
    publicKey: params.publicKey,
    counter: params.counter,
    transports: params.transports,
    createdAt: existing?.createdAt || timestamp,
    updatedAt: timestamp,
  };

  if (cosmosConfigured()) {
    const container = await getContainer(PASSKEYS_CONTAINER);
    await container.items.upsert(passkey);
  } else {
    memoryPasskeys.set(passkey.id, passkey);
  }
}

async function getUserById(userId: string): Promise<AuthUserRecord | null> {
  if (cosmosConfigured()) {
    const container = await getContainer(AUTH_USERS_CONTAINER);
    const { resources } = await container.items
      .query<StoredAuthUser>({
        query: 'SELECT TOP 1 * FROM c WHERE c.type = @type AND c.id = @id',
        parameters: [
          { name: '@type', value: 'auth-user' },
          { name: '@id', value: userId },
        ],
      })
      .fetchAll();

    return resources[0] ? mapUser(resources[0]) : null;
  }

  const user = memoryUsers.get(userId);
  return user ? mapUser(user) : null;
}

async function updatePasskeyCounter(passkey: StoredPasskey, counter: number): Promise<void> {
  const updated: StoredPasskey = {
    ...passkey,
    counter,
    updatedAt: nowISO(),
  };

  if (cosmosConfigured()) {
    const container = await getContainer(PASSKEYS_CONTAINER);
    await container.items.upsert(updated);
  } else {
    memoryPasskeys.set(updated.id, updated);
  }
}

export async function verifyPasskeyAssertion(params: {
  assertion: AuthenticationResponseJSON;
  expectedChallenge: string;
}): Promise<AuthUserRecord | null> {
  const passkey = await getPasskeyByCredentialId(params.assertion.id);
  if (!passkey) {
    return null;
  }

  const verification = await verifyAuthenticationResponse({
    response: params.assertion,
    expectedChallenge: params.expectedChallenge,
    expectedOrigin: getWebAuthnOrigins(),
    expectedRPID: getWebAuthnRPID(),
    credential: {
      id: passkey.credentialId,
      publicKey: isoBase64URL.toBuffer(passkey.publicKey),
      counter: passkey.counter,
      transports: passkey.transports,
    },
    requireUserVerification: false,
  });

  if (!verification.verified) {
    return null;
  }

  if (typeof verification.authenticationInfo.newCounter === 'number') {
    await updatePasskeyCounter(passkey, verification.authenticationInfo.newCounter);
  }

  return getUserById(passkey.userId);
}
