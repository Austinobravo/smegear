import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/emails/mailer";

/**
 * @swagger
 * /api/auth/resend-verification:
 *   post:
 *     summary: Resend verification email
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
 *     responses:
 *       200:
 *         description: Verification email sent
 *       400:
 *         description: Email not found or already verified
 */

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    if (user.isEmailVerified) {
      return NextResponse.json({ message: "Email is already verified" }, { status: 400 });
    }

    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/verify?token=${token}`;

    // Update verification link (optional)
    await prisma.user.update({
      where: { email },
      data: { verificationLink: token },
    });

    

      await sendEmail({
          to: email,
          subject: "You're In! Welcome to SmeGear 🎉",
          template: "signup-verification",
          data: { verificationUrl },
        });

    return NextResponse.json({ message: "Verification email sent" }, { status: 200 });

  } catch (error) {
    console.error("Error resending verification:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
