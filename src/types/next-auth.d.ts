import NextAuth, { type DefaultSession, DefaultProfile } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: { email: string } & DefaultSession['user'];
  }

  interface Profile {
    email: string;
    email_verified: boolean;
  }
}
