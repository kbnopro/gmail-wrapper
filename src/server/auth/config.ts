import { PrismaAdapter } from "@auth/prisma-adapter";
import { env } from "@env";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { getUserToken } from "@/features/emails/utils/getUserToken";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    error?: string;
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
          access_type: "offline",
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  events: {
    async linkAccount(message) {
      if (!message.user.id) {
        return;
      }
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      session = {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
      if (!(await getUserToken(user.id))) {
        session.error = "RefreshTokenError";
      }
      return session;
    },
    signIn: async ({ account }) => {
      if (!account) {
        return false;
      }
      const googleAccount = await db.account.findFirst({
        where: {
          provider: "google",
          providerAccountId: account?.providerAccountId,
        },
      });
      if (!googleAccount) {
        return true;
      }
      await db.account.update({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: account?.providerAccountId,
          },
        },
        data: {
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
        },
      });
      return true;
    },
  },
} satisfies NextAuthConfig;
