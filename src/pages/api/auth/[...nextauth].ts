import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { devLogger } from '@/lib/devLogger';

const AUTHORIZED_EMAILS = JSON.parse(process.env.AUTHORIZED_EMAILS) as string[];

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { prompt: 'consent', access_type: 'offline', response_type: 'code' },
      },
    }),
  ],

  session: { strategy: 'jwt' },
  theme: { colorScheme: 'dark' },
  events: {
    signOut: async ({ session, token }) => {
      devLogger(['signOut', { session, token }]);
    },
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account.provider !== 'google') return true;
      return Boolean(profile.email_verified && AUTHORIZED_EMAILS.includes(profile.email));
    },

    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: async ({ token, account }) => {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    session: async ({ session, token, user }) => {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
