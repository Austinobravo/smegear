import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { LessonPatchSchema, LessonSchema } from "@/schemas/backendFormSchema";
import { getCurrentUser } from "@/lib/getServerSession";

/**
 * @swagger
 * /api/lessons:
 *   get:
 *     summary: Get all lessons in a module
 *     tags: [Lessons]
 *     parameters:
 *       - in: query
 *         name: moduleId
 *         schema:
 *           type: string
 *         required: true
 *         description: Filter lessons by module ID
 *     responses:
 *       200:
 *         description: List of lessons
 */
export async function GET(req:Request) {
    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get("moduleId");

      if(!moduleId){
      return NextResponse.json({message: "Please add a moduleId in the params"}, {status: 403})
    }

  try {
    const lessons = await prisma.lesson.findMany({
    where: moduleId ? { moduleId } : undefined,
      include: {
        module: true,
        
      },
      orderBy: {
        order: 'asc',
      }
    });
    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - moduleId
 *               - order
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               moduleId:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Lesson created
 *       400:
 *         description: Validation failed
 */
export async function POST(req: Request) {
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({message: "Unauthorized"}, {status:401})
    }
  try {
    const body = await req.json();
    const parsed = LessonSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({message: "Validation error" ,errors: parsed.error.flatten() }, { status: 400 });
    }

    const lesson = await prisma.lesson.create({ data: parsed.data });
    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}


/**
 * @swagger
 * /api/modules:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Modules]
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
 *       200:
 *         description: Module deleted successfully
 */
export async function DELETE(req: Request) {
      const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Lesson id is required." }, { status: 400 });
    }

    const existingLesson = await prisma.lesson.findUnique({
      where: { id },
    });
    
    if(!existingLesson){
        return NextResponse.json({ message: "Lesson does not exist"}, { status: 404 });
    }

    await prisma.lesson.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Lesson deleted successfully." });
  } catch (error) {
    console.error("Error deleting Lesson:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
  }
}


/**
 * @swagger
 * /api/lessons:
 *   patch:
 *     summary: Update a lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Lesson updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Lesson not found
 */
export async function PATCH(req: Request,) {
  try {
    const body = await req.json();
    const { id } = body
    const parsed = LessonPatchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    const updatedLesson = await prisma.lesson.update({
      where: { id},
      data: parsed.data,
    });

    return NextResponse.json({ data: updatedLesson });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ message: "Lesson not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
