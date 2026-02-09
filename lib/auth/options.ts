import type { NextAuthOptions } from 'next-auth';
import type { OAuthConfig } from 'next-auth/providers/oauth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
import LinkedInProvider from 'next-auth/providers/linkedin';
import AzureADProvider from 'next-auth/providers/azure-ad';
import InstagramProvider from 'next-auth/providers/instagram';

import { ensureAuthUser, verifyPasskeyAssertion } from '@/lib/auth/passkey-store';
import {
  WEBAUTHN_AUTH_CHALLENGE_COOKIE,
} from '@/lib/auth/webauthn-config';
import { providerIsConfigured } from '@/lib/auth/providers';

function readCookie(cookieHeader: string | null | undefined, key: string): string | null {
  if (!cookieHeader) {
    return null;
  }

  for (const item of cookieHeader.split(';')) {
    const [cookieKey, ...raw] = item.trim().split('=');
    if (cookieKey === key) {
      return decodeURIComponent(raw.join('='));
    }
  }

  return null;
}

const providers = [] as NextAuthOptions['providers'];

if (providerIsConfigured('google')) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  );
}

if (providerIsConfigured('facebook')) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  );
}

if (providerIsConfigured('twitter')) {
  providers.push(
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: '2.0',
    }),
  );
}

if (providerIsConfigured('linkedin')) {
  providers.push(
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),
  );
}

if (providerIsConfigured('azure-ad')) {
  providers.push(
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  );
}

if (providerIsConfigured('instagram')) {
  providers.push(
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
    }),
  );
}

if (providerIsConfigured('amazon')) {
  const amazonProvider: OAuthConfig<{ user_id: string; name?: string; email?: string; picture?: string }> =
    {
      id: 'amazon',
      name: 'Amazon',
      clientId: process.env.AMAZON_CLIENT_ID as string,
      clientSecret: process.env.AMAZON_CLIENT_SECRET as string,
      type: 'oauth',
      authorization: {
        url: 'https://www.amazon.com/ap/oa',
        params: { scope: 'profile' },
      },
      token: 'https://api.amazon.com/auth/o2/token',
      userinfo: 'https://api.amazon.com/user/profile',
      checks: ['pkce', 'state'],
      profile(profile) {
        return {
          id: profile.user_id,
          name: profile.name,
          email: profile.email,
          image: profile.picture || null,
        };
      },
    };

  providers.push(
    amazonProvider,
  );
}

providers.push(
  CredentialsProvider({
    id: 'passkey',
    name: 'Passkey',
    credentials: {
      assertion: {
        label: 'Assertion',
        type: 'text',
      },
    },
    async authorize(credentials, req) {
      const assertionValue = credentials?.assertion;
      if (!assertionValue) {
        return null;
      }

      const challenge = readCookie(req.headers?.cookie, WEBAUTHN_AUTH_CHALLENGE_COOKIE);
      if (!challenge) {
        return null;
      }

      let assertion: unknown;
      try {
        assertion = JSON.parse(assertionValue);
      } catch {
        return null;
      }

      const user = await verifyPasskeyAssertion({
        assertion: assertion as Parameters<typeof verifyPasskeyAssertion>[0]['assertion'],
        expectedChallenge: challenge,
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    },
  }),
);

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers,
  pages: {
    signIn: '/auth/signup',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      const authUser = await ensureAuthUser({
        email: user.email,
        name: user.name,
      });

      user.id = authUser.id;
      user.email = authUser.email;
      user.name = authUser.name || user.name;

      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.userId as string) || token.sub || '';
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
