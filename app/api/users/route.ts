import { getCurrentUser } from "@/lib/getServerSession";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
export async function GET() {
  const  user = await getCurrentUser()
  if(!user){
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
  }
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}