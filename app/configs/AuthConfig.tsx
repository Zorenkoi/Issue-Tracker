import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

const AuthConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    redirect: ({ url, baseUrl }) => {
      return baseUrl + "/issues";
    },
  },
};

export default AuthConfig;
