import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabaseUrl, supabaseKey } from '@/utils/supabase';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: {
    supabase: {
      url: supabaseUrl,
      key: supabaseKey,
      tableName: 'users',
    },
  },
  callbacks: {
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.userId = user.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);