import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/getServerSession";

/**
 * @swagger
 * /api/payments/paystack/init:
 *   post:
 *     summary: Initialize Paystack transaction for a course
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [courseId]
 *             properties:
 *               courseId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paystack init ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authorization_url:
 *                   type: string
 *                 reference:
 *                   type: string
 *       400:
 *         description: Validation or state error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user?.id || !user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const schema = z.object({ courseId: z.string() });
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload", errors: parsed.error.flatten() }, { status: 400 });
    }

    const { courseId } = parsed.data;
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return NextResponse.json({ message: "Course not found" }, { status: 404 });
    if (!course.published) return NextResponse.json({ message: "Course not available" }, { status: 400 });

    // Prevent paying twice if already enrolled
    const existing = await prisma.enrollment.findFirst({
      where: { userId: user.id, courseId },
    });
    if (existing) return NextResponse.json({ message: "Already enrolled" }, { status: 400 });

    // Paystack amount is in kobo (NGN * 100)
    const price = Number(course.price);
    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json({ message: "Invalid course price" }, { status: 400 });
    }
    const amountKobo = Math.round(price * 100);

    // const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const BASE_URL = "http://localhost:3000";
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ message: "Paystack key missing" }, { status: 500 });
    }

    const initRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: amountKobo,
        currency: "NGN",
        callback_url: `${BASE_URL}/payment/callback`,
        metadata: {
          courseId,
        },
      }),
    });

    const initJson = await initRes.json();
    if (!initRes.ok || !initJson?.status) {
      return NextResponse.json({ message: initJson?.message || "Paystack init failed" }, { status: 400 });
    }

    const authorization_url = initJson.data.authorization_url as string;
    const reference = initJson.data.reference as string;

    return NextResponse.json({ authorization_url, reference });
  } catch (error) {
    console.error("Paystack init error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
