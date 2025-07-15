import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/modules/{id}:
 *   get:
 *     summary: Get a module by ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module found
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    
  try {
    const { id } = await params;

    const module = await prisma.module.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, title: true } },
        lessons: true,
      },
    });

    if (!module) {
      return NextResponse.json({ message: "Module not found" }, { status: 404 });
    }

    return NextResponse.json(module);
  } catch (error) {
    console.error("Error fetching module:", error);
    return NextResponse.json({ message: "Failed to fetch module" }, { status: 500 });
  }
}