import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/prisma";
import { comparePassword } from "@/lib/utils";
import { emailRegex, emojiRegex } from "@/lib/formSchema";
import jwt from "jsonwebtoken";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", placeholder: "Your email", type: "email" },
        password: { label: "password", placeholder: "Your Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) throw new Error("Invalid credentials");

        const email = credentials.email.toLowerCase();
        const password = credentials.password;

        if (email.trim().length <= 1 || password.trim().length <= 1) throw new Error("Invalid credentials");
        if (email.match(emojiRegex) || password.match(emojiRegex)) throw new Error("Invalid credentials");

        const user = await prisma.user.findFirst({
          where: { OR: [{ email }, { username: email }] },
        });

        if (!user?.isEmailVerified) throw new Error("Unverified email");
        if (!user) throw new Error("Invalid credentials");

        const isCorrectPassword = await comparePassword(password, user.passwordHash.trim());
        if (!isCorrectPassword) throw new Error("Invalid credentials");

        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
      };
      // Embed signed JWT for cross-domain use
      (session as any).accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET!);
      return session;
    },
  },
};
