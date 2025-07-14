import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
// import rateLimit from "@/lib/rate-limit";
import { BASE_URL } from "@/lib/globals";


/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     summary: Email verification
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *             items:
 *                 type: string
 *       400:
 *         description: Invalid token
 */

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  // Rate limit by IP or token
//   await rateLimit(req);

  if (!token) return NextResponse.json({ message: "Invalid token" }, { status: 400 });

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

    const isUserVerified = await prisma.user.findUnique({
        where:{email}
    })

    if(isUserVerified?.isEmailVerified){
        return NextResponse.json({ message: "Already verified" }, { status: 400 }); 
    }

    await prisma.user.update({
      where: { email },
      data: { 
        emailVerified: new Date(),
        isEmailVerified: true,
        verificationLink: null
     },
    });

    return NextResponse.json({message: `Verified successfully`}, {status: 200});
  } catch (err) {
    console.log("err", err)
    return NextResponse.json({ error: "Token expired or invalid" }, { status: 400 });
  }
};
