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

        // 2 Fallback: ask production backend directly using stored cookies
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      {
        withCredentials: true, // sends stored cookies to prod backend
        headers: req ? { cookie: req.headers.get("cookie") || "" } : undefined
      }
    );

    return res.data || null;

  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};
