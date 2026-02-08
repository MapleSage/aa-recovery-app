'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session, status } = useSession();

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px 96px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.3 }}>Settings</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        {status === 'loading'
          ? 'Loading session…'
          : session?.user?.email
            ? `Signed in as ${session.user.email}`
            : 'Not signed in.'}
      </p>

      <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link
          href="/app"
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          Back to App
        </Link>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
