import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

/**
 * @swagger
 * /api/lessons/{id}:
 *   get:
 *     summary: Get a lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson found
 *       404:
 *         description: Not found
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    
  try {
    const { id } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: { module: true },
    });

    if (!lesson) {
      return NextResponse.json({ message: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
