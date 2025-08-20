import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course found
 */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const course = await prisma.course.findFirst({
      where: { 
        OR:[
          {
            id: slug
          },
          {
            slug
          }
        ]
       },
    });

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
  }
}