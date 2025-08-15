import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";
import { User } from "./generated/prisma";

export const getCurrentUser = async (req?: NextRequest): Promise<User | null> => {
  try {
    // 1 Try getServerSession first
    const session = await getServerSession(options);
    if (session?.user?.id) {
      return session.user as User;
    }

     // 2 Fallback: try getToken (e.g., from Authorization header)
    if (req) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (token && token.id) {
        return token as User;
      }
    }

    // Not authenticated
    return null;

  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};
