import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";

export default NextAuth({
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
      tableName: "users",
      // optional:
      // schema: 'public' // default is 'public'
    },
  },
  callbacks: {
    session: async ({ session, token }) => {
      // Send access token to the client
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
});