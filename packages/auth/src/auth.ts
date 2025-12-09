import { prismaClient } from "@repo/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import dotenv from "dotenv";

dotenv.config();

const getBaseDomain = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split(".");
    if (parts.length >= 2) {
      return parts.slice(-2).join(".");
    }
    return hostname;
  } catch {
    return undefined;
  }
};

const isProduction = process.env.NODE_ENV === "production";
const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:4000";
const baseDomain = getBaseDomain(baseURL);

export const auth = betterAuth({
  baseURL,
  trustedOrigins: [process.env.CLIENT_URL || "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [jwt(), nextCookies()],

  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),

  advanced: {
    useSecureCookies: isProduction,

    defaultCookieAttributes: {

      sameSite: isProduction ? "none" : "lax",

      secure: isProduction,

      domain: isProduction && baseDomain ? `.${baseDomain}` : undefined,
    },
  },
});
