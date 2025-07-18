import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { ProgressSchema, ProgressUpdateSchema } from "@/schemas/backendFormSchema";
import { getCurrentUser } from "@/lib/getServerSession";



/**
 * @swagger
 * /api/progress:
 *   post:
 *     summary: Create progress entry for a user on a lesson
 *     tags: [Progress]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - lessonId
 *             properties:
 *               userId:
 *                 type: string
 *               lessonId:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Progress started
 */
export async function POST(req: Request) {
  const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
    const userId = user.id
  const body = await req.json();
  const validated = ProgressSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json({ error: validated.error.flatten() }, { status: 400 });
  }

  const {  lessonId, completed } = validated.data;

  try{

    const progress = await prisma.progress.upsert({
        where: {
            userId,
            lessonId,
        },
        update: {
          completed,
          completedAt: completed ? new Date() : null,
        },
        create: {
          userId,
          lessonId,
          completed: completed || false,
        },
      });
    
      return NextResponse.json(progress, { status: 201 });
   }catch (error: any) {
    if (error.code === 'P2025') {
        return NextResponse.json({ message: "Progress not created" }, { status: 404 });
    }
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
    }

}

/**
 * @swagger
 * /api/progress:
 *   get:
 *     summary: Get progress for a specific user and lesson
 *     tags: [Progress]
 *     parameters:
 *       - in: query
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Progress record
 */
export async function GET(req: NextRequest) {
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  const { searchParams } = new URL(req.url);
  const userId = user.id
  const lessonId = searchParams.get("lessonId");

  if (!lessonId) {
    return NextResponse.json({ error: "lessonId are required" }, { status: 400 });
  }

  try{
      const progress = await prisma.progress.findUnique({
        where: {
            userId,
            lessonId
        },
      });
    
      return NextResponse.json(progress);

   }catch (error: any) {
    console.log("Error in get progress", error)
        return NextResponse.json({ message: "Server Error", error }, { status: 500 });
      }
}


/**
 * @swagger
 * /api/progress:
 *   patch:
 *     summary: Update a progress entry
 *     tags: [Progress]
 *     parameters:
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *               id:
 *                  type: string
 *     responses:
 *       200:
 *         description: Updated progress
 */
export async function PATCH(req: Request) {
  const user = await getCurrentUser()
  if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  const body = await req.json();
  const validated = ProgressUpdateSchema.safeParse(body);

  const {id }=  body


  if (!validated.success) {
    return NextResponse.json({ error: validated.error.flatten() }, { status: 400 });
  }

  try{

      const updated = await prisma.progress.update({
        where: { id },
        data: {
          completed: validated.data.completed,
          completedAt: validated.data.completed ? new Date() : null,
        },
      });
    
      return NextResponse.json(updated);
   }catch (error: any) {
    if (error.code === 'P2025') {
        return NextResponse.json({ message: "Progress not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
    }

}

/**
 * @swagger
 * /api/progress/:
 *   delete:
 *     summary: Delete/reset a progress entry
 *     tags: [Progress]
 *     parameters:
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
export async function DELETE(req: Request) {
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
    const body = await req.json()
    const {id} = body
    try{
        await prisma.progress.delete({
          where: { id},
        });

        return  NextResponse.json(null, { status: 204 });
    }catch (error: any) {
        if (error.code === 'P2025') {
          return NextResponse.json({ message: "Progress not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Server Error", error }, { status: 500 });
      }

}