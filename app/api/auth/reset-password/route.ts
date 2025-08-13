
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";
// import rateLimit from "@/lib/rate-limit";
import jwt from "jsonwebtoken";
import { BASE_URL, validateForEmptySpaces } from "@/lib/globals";
// import { ResetForgotPasswordSchema } from "@/lib/formSchema";
import { sendEmail } from "@/emails/mailer";
import z from "zod";
import { emojiRegex } from "@/lib/formSchema";

const ResetForgotPasswordSchema = z.object({
    newPassword: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
    confirmNewPassword: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  }).refine((data) => !data.newPassword || data.newPassword === data.confirmNewPassword, {message: "Passwords don't match", path: ["confirmNewPassword"]})
  

  /**
 * @swagger
 * /api/auth/reset-password:
 *   get:
 *     summary: Check token validity
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for password reset
 *     responses:
 *       200
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

    // If token is valid, redirect to reset password page with token in query
    return NextResponse.redirect(`${BASE_URL}/reset-password?token=${token}`);
  } catch (err) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }
}


/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset a password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - confirmNewPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *               confirmNewPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request
 */
export async function POST(req: Request) {
//   await rateLimit(req);
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Unknown IP';
  

  const reset_time = new Date().toLocaleString('en-US', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  const body = await req.json();
  
  const parsed = ResetForgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
      return NextResponse.json({ message: "Invalid input", errors: parsed.error.format() }, { status: 400 });
    }
  const { token } = body
  const { newPassword } = parsed.data;
  

  if (!token || !newPassword) {
    return NextResponse.json({ message: "Token and new password are required" }, { status: 400 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const email = decoded.email.toLowerCase();

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const existingUser = await prisma.user.findUnique({where: { email }})

    if(!existingUser) return NextResponse.json({message: "User not found"}, {status: 404})

    const user = await prisma.user.update({
      where: { email: existingUser.email },
      data: { passwordHash: hashedPassword,
        verificationLink: null
      },
    });

     await sendEmail({
          to: email,
          subject: "Password Reset Successful🎉",
          template: "password-reset-successful",
          data: { 
            name: `${user.firstName} ${user.lastName}`,
            loginLink: `https://smegear.agency/login`,
            reset_time,
            ip_address: ip,
            year: new Date().getFullYear()

           },
        });

    return NextResponse.json({ message: "Password reset successful" });
  } catch (err) {
    return NextResponse.json({ message: "Internal Server Error", error: err }, { status: 400 });
  }
}
