import { getCurrentUser } from "@/lib/getServerSession";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


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
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser(req)
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
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
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
  }
}