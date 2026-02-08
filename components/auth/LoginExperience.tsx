'use client';

import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FaAmazon, FaFacebookF, FaGoogle, FaInstagram, FaLinkedinIn, FaMicrosoft } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

type ProviderStatus = Record<string, boolean>;

type ProviderButton = {
  id: string;
  label: string;
  icon: React.ReactNode;
  accent: string;
};

const providerButtons: ProviderButton[] = [
  { id: 'google', label: 'Google', icon: <FaGoogle />, accent: '#f44336' },
  { id: 'facebook', label: 'Facebook', icon: <FaFacebookF />, accent: '#1877f2' },
  { id: 'twitter', label: 'X', icon: <FaXTwitter />, accent: '#111111' },
  { id: 'linkedin', label: 'LinkedIn', icon: <FaLinkedinIn />, accent: '#0a66c2' },
  { id: 'azure-ad', label: 'Entra ID', icon: <FaMicrosoft />, accent: '#2f2f2f' },
  { id: 'instagram', label: 'Instagram', icon: <FaInstagram />, accent: '#e1306c' },
  { id: 'amazon', label: 'Amazon', icon: <FaAmazon />, accent: '#ff9900' },
];

async function parseJson<T>(response: Response): Promise<T> {
  const json = (await response.json()) as T;
  return json;
}

export default function LoginExperience() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [providerStatus, setProviderStatus] = useState<ProviderStatus>({});
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const loadProviderStatus = async () => {
      const response = await fetch('/api/auth/providers-status', { cache: 'no-store' });
      const data = await parseJson<{ providers: ProviderStatus }>(response);
      setProviderStatus(data.providers || {});
    };

    loadProviderStatus().catch(() => {
      setProviderStatus({});
    });
  }, []);

  const configuredCount = useMemo(
    () => Object.values(providerStatus).filter(Boolean).length,
    [providerStatus],
  );

  const handleSocialSignIn = async (providerId: string) => {
    setNotice(null);
    setBusyAction(providerId);
    await signIn(providerId, { callbackUrl: '/app' });
    setBusyAction(null);
  };

  const handlePasskeySignIn = async () => {
    setNotice(null);
    setBusyAction('passkey-login');

    try {
      const optionsResponse = await fetch('/api/webauthn/authentication/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '' }),
      });

      if (!optionsResponse.ok) {
        throw new Error('Unable to start passkey authentication');
      }

      const options = await parseJson<Parameters<typeof startAuthentication>[0]['optionsJSON']>(
        optionsResponse,
      );

      const assertion = await startAuthentication({ optionsJSON: options });
      const result = await signIn('passkey', {
        redirect: false,
        callbackUrl: '/app',
        assertion: JSON.stringify(assertion),
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push(result?.url || '/app');
      router.refresh();
    } catch {
      setNotice('Passkey sign-in failed. Register a passkey first or try a social provider.');
    } finally {
      setBusyAction(null);
    }
  };

  const handleRegisterPasskey = async () => {
    setNotice(null);
    setBusyAction('passkey-register');

    try {
      const optionsResponse = await fetch('/api/webauthn/register/options', {
        method: 'POST',
      });

      if (!optionsResponse.ok) {
        throw new Error('Unable to begin passkey registration');
      }

      const options = await parseJson<Parameters<typeof startRegistration>[0]['optionsJSON']>(
        optionsResponse,
      );

      const credential = await startRegistration({ optionsJSON: options });

      const verifyResponse = await fetch('/api/webauthn/register/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Passkey verification failed');
      }

      setNotice('Passkey registered. You can now use biometric sign-in.');
    } catch {
      setNotice('Passkey registration failed. Check RP ID/origin settings and try again.');
    } finally {
      setBusyAction(null);
    }
  };

  const isLoading = status === 'loading';

  return (
    <main className="auth-shell">
      <div className="auth-backdrop auth-backdrop-a" />
      <div className="auth-backdrop auth-backdrop-b" />
      <div className="auth-cityline" />

      <section className="auth-card" aria-busy={busyAction !== null || isLoading}>
        <h1 className="auth-title">Secure Recovery Login</h1>
        <p className="auth-subtitle">
          Sign in with social identity or passkey biometrics.
        </p>

        <div className="auth-provider-grid">
          {providerButtons.map((provider) => {
            const configured = Boolean(providerStatus[provider.id]);
            const isBusy = busyAction === provider.id;

            return (
              <button
                key={provider.id}
                className={`auth-provider-btn ${configured ? '' : 'disabled'}`}
                style={{ ['--brand' as string]: provider.accent }}
                onClick={() => handleSocialSignIn(provider.id)}
                disabled={!configured || isBusy || isLoading}
              >
                <span className="icon" aria-hidden="true">
                  {provider.icon}
                </span>
                <span className="label">{isBusy ? 'Connecting...' : provider.label}</span>
                {!configured ? <span className="meta">Set env keys</span> : null}
              </button>
            );
          })}
        </div>

        <button
          className="auth-passkey-btn"
          onClick={handlePasskeySignIn}
          disabled={busyAction === 'passkey-login' || isLoading}
        >
          {busyAction === 'passkey-login'
            ? 'Starting biometrics...'
            : 'Use Face ID / Touch ID / Passkey'}
        </button>

        {session?.user ? (
          <div className="auth-session-panel">
            <p>
              Signed in as <strong>{session.user.email}</strong>
            </p>
            <div className="auth-session-actions">
              <button
                className="auth-glass-btn"
                onClick={handleRegisterPasskey}
                disabled={busyAction === 'passkey-register'}
              >
                {busyAction === 'passkey-register' ? 'Registering...' : 'Register Passkey'}
              </button>
              <button className="auth-glass-btn" onClick={() => router.push('/app')}>
                Go to App
              </button>
              <button className="auth-ghost-btn" onClick={() => signOut({ callbackUrl: '/auth/login' })}>
                Sign Out
              </button>
            </div>
          </div>
        ) : null}

        <p className="auth-footnote">
          Configured social providers: {configuredCount} / {providerButtons.length}
        </p>
        {notice ? <p className="auth-notice">{notice}</p> : null}
      </section>
    </main>
  );
}
