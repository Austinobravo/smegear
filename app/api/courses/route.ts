import { getCurrentUser } from "@/lib/getServerSession";
import { createNewSlug } from "@/lib/globals";
import prisma from "@/prisma/prisma";
import { CourseCreateSchema, CourseUpdateSchema } from "@/schemas/backendFormSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 */
export async function GET() {
    // const user = await getCurrentUser()
    // if(!user){
    //   return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    // }
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });

  }
}

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               price:
 *                 type: number
 *               published:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Course created successfully
 */
export async function POST(req: Request) {
    const user = await getCurrentUser()
    if(!user){
      return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  try {
    const body = await req.json();
    const parsed = CourseCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });
    }

    const slug = await createNewSlug(parsed.data.title)


    const course = await prisma.course.create({
      data: {slug: slug, instructorId: user.id, ...parsed.data},
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });

  }
}

/**
 * @swagger
 * /api/courses:
 *   patch:
 *     summary: Update a course
 *     tags: [Courses]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               price:
 *                 type: number
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
export async function PATCH(req: Request) {
    const user = await getCurrentUser()
    if(!user){
      return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  try {
    const body = await req.json();
    const parsed = CourseUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });
    }

    const { id, ...updateData } = parsed.data;

    const existingCourse = await prisma.course.findUnique({where:{id}})

    if (!existingCourse) {
      return NextResponse.json({ message: "Course does not exist." }, { status: 404 });
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });

  }
}

/**
 * @swagger
 * /api/courses:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
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
 *         description: Course deleted successfully
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
      return NextResponse.json({ message: "Course id is required." }, { status: 400 });
    }
    
    const existingCourse = await prisma.course.findUnique({where:{id}})

    if (!existingCourse) {
      return NextResponse.json({ message: "Course does not exist." }, { status: 404 });
    }
    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error("Error deleting course:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
  }
}
