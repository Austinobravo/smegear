import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import z from "zod";
import { ReviewSchema, ReviewUpdateSchema } from "@/schemas/backendFormSchema";
import { getCurrentUser } from "@/lib/getServerSession";



/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all course reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
export async function GET() {
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
    try{
        const reviews = await prisma.review.findMany({
          include: { user: true, course: true },
        });
        return NextResponse.json(reviews);

    }catch (error: any) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [courseId, rating]
 *             properties:
 *               courseId:
 *                 type: string
 *                 format: uuid
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Invalid input
 */
export async function POST(req: NextRequest) {
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  try {
    const body = await req.json();
    const validated = ReviewSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: validated.error.flatten() },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {userId:user?.id, ...validated.data},
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ message: "Server error", error: error }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/reviews:
 *   patch:
 *     summary: Update a review
 *     tags: [Review]
 *     parameters:
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated
 *       404:
 *         description: Review not found
 */
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id } = body
  const validated = ReviewUpdateSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  try{
      const existing = await prisma.review.findUnique({ where: { id } });
      if (!existing) {
        return NextResponse.json({ message: "Review not found" }, { status: 404 });
      }
    
      const updated = await prisma.review.update({
        where: { id },
        data: validated.data,
      });
    
      return NextResponse.json(updated);

   } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ message: "Server error", error: error }, { status: 500 });
  }

}

/**
 * @swagger
 * /api/reviews:
 *   delete:
 *     summary: Delete a review
 *     tags: [Review]
 *     parameters:
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       204:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */
export async function DELETE(req: NextRequest) {
   const body = await req.json();
  const { id } = body

  try{
      const existing = await prisma.review.findUnique({ where: { id } });
      if (!existing) {
        return NextResponse.json({ message: "Review not found" }, { status: 404 });
      }
    
      await prisma.review.delete({ where: { id } });
    
      return NextResponse.json(null, { status: 204 });

  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ message: "Server error", error: error }, { status: 500 });
  }

}
