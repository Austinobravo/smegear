import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/getServerSession";

/**
 * @swagger
 * /api/payments/paystack/verify:
 *   post:
 *     summary: Verify Paystack transaction and enroll the user
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [reference]
 *             properties:
 *               reference:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified and enrollment created
 *       400:
 *         description: Invalid or mismatched payment
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const schema = z.object({ reference: z.string().min(1) });
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload", errors: parsed.error.flatten() }, { status: 400 });
    }

    const { reference } = parsed.data;
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ message: "Paystack key missing" }, { status: 500 });
    }

    // Verify with Paystack
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
      cache: "no-store",
    });
    const verifyJson = await verifyRes.json();
    if (!verifyRes.ok || !verifyJson?.status) {
      return NextResponse.json({ message: verifyJson?.message || "Verification failed" }, { status: 400 });
    }

    const data = verifyJson.data;
    if (data.status !== "success") {
      return NextResponse.json({ message: "Payment not successful" }, { status: 400 });
    }

    const metadata = data.metadata || {};
    const courseId = metadata.courseId as string | undefined;
    if (!courseId) return NextResponse.json({ message: "Missing courseId in metadata" }, { status: 400 });

    // Cross-check course price vs paid amount (NGN * 100)
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return NextResponse.json({ message: "Course not found" }, { status: 404 });

    const expectedAmount = Math.round(Number(course.price) * 100);
    if (data.amount !== expectedAmount) {
      return NextResponse.json({ message: "Amount mismatch" }, { status: 400 });
    }
    if (data.currency !== "NGN") {
      return NextResponse.json({ message: "Unsupported currency" }, { status: 400 });
    }

    // Idempotent enrollment
    const existing = await prisma.enrollment.findFirst({
      where: { userId: user.id, courseId },
      include: { course: true },
    });
    if (existing) return NextResponse.json({ data: existing, message: "Already enrolled" });

    const enrollment = await prisma.enrollment.create({
      data: { userId: user.id, courseId },
      include: { course: true },
    });

    return NextResponse.json({message: "Payment verified and enrollment created", data: enrollment });
  } catch (error) {
    console.error("Paystack verify error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
