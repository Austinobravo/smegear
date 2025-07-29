// /app/api/auth/resend-verification/route.ts

import { NextResponse } from "next/server"
import prisma from "@/prisma/prisma"
import { sendEmail } from "@/emails/mailer" // You'll define this
import { BASE_URL, createVerificationToken } from "@/lib/globals"

/**
 * @swagger
 * /api/auth/resend-verification:
 *   post:
 *     summary: Request for a new verification link
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Verification email sent.
 *       400:
 *         description: Invalid request
 */
export async function POST(req: Request) {
  const { email } = await req.json()


  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  if (user.isEmailVerified) {
    return NextResponse.json({ message: "Email already verified" }, { status: 400 })
  }

  const token = createVerificationToken(user.email)
  const VERIFICATION_LINK = `${BASE_URL}/verify-email?token=${token}`;

  await prisma.user.update({
        where:{
          id: user.id
        },
        data:{
          verificationLink: VERIFICATION_LINK
        }
      })
  
  await sendEmail({
      to: email,
      subject: "You're In! Welcome to SmeGear 🎉",
      template: "signup-verification",
      data: { VERIFICATION_LINK }
    });


  return NextResponse.json({ message: "Verification email sent" })
}
