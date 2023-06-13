import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@acme/db";

// import { env } from "../env.mjs";

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    // role: UserRole;
    phoneNumber: string;
  }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "phone-credentials",
      id: "phone-credentials",
      type: "credentials",
      credentials: {
        phoneNumber: {
          label: "Phone Number",
          type: "text",
          placeholder: "091234567890",
        },
        verificationToken: {
          label: "Verification Code",
          type: "text",
        },
      },
      async authorize(credentials, _req) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { phoneNumber: credentials.phoneNumber },
          include: { smsVerification: true },
        });
        if (!user || !user.smsVerification) return null;

        const now = new Date();
        if (
          Number(now) > Number(user.smsVerification.expires) ||
          user.smsVerification.token !== credentials.verificationToken
        ) {
          return null;
        }

        return user;
      },
    }),
  ],
};
