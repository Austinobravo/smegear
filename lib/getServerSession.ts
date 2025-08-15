import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";
import { User } from "./generated/prisma";
import { Session } from "next-auth";
import prisma from "@/prisma/prisma";

export const getCurrentUser = async (req?: NextRequest): Promise<User | null> => {
  try {
    // 1 Try getServerSession first
    const session = await getServerSession(options);
    if (session?.user?.id) {
      return session.user;
    }
    console.log("sesioni", session)
    console.log("req", req)
    // 2 Fallback: Bearer token from Authorization header
    // First try the cookie/session way
    if(req){
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      console.log("token", token)
    
      if (token?.id) {
        return await prisma.user.findUnique({
          where: { id: token.id as string },
        });
      }
    
      // No cookie session found — maybe a Bearer token
      const authHeader = req.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        const bearerToken = authHeader.split(" ")[1];
        const bearerData = await getToken({
          req: new NextRequest(req.url, {
            headers: { authorization: `Bearer ${bearerToken}` },
          }),
          secret: process.env.NEXTAUTH_SECRET,
        });
    
        if (bearerData?.id) {
          return await prisma.user.findUnique({
            where: { id: bearerData.id as string },
          });
        }
      }

    }


    // Not authenticated
    return null;

  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};

export const getCurrentSession = async (req?: NextRequest): Promise<Session | null> => {
  try {
    // 1 Try getServerSession first
    const session = await getServerSession(options);
    if (session?.user?.id) {
      return session;
    }

    // Not authenticated
    return null;

  } catch (error) {
    console.error("Error in getCurrentSession:", error);
    return null;
  }
};
