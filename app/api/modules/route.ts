import { getCurrentUser } from "@/lib/getServerSession";
import prisma from "@/prisma/prisma";
import { ModuleCreateSchema, ModuleUpdateSchema } from "@/schemas/backendFormSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/modules:
 *   get:
 *     summary: Get all modules in a course
 *     tags: [Modules]
 *     parameters:
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: Filter modules by course ID
 *     responses:
 *       200:
 *         description: List of modules
 */
export async function GET(req: NextRequest) {
    // const user = await getCurrentUser(req)
    // if(!user){
    //     return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    // }
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if(!courseId){
      return NextResponse.json({message: "Please add a courseId in the params"}, {status: 403})
    }

    const modules = await prisma.module.findMany({
      where: courseId ? { courseId } : undefined,
      include: {
        course: {
          select: { id: true, title: true },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - courseId
 *               - order
 *             properties:
 *               title:
 *                 type: string
 *               courseId:
 *                 type: string
 *               order:
 *                 type: number
 *     responses:
 *       201:
 *         description: Module created successfully
 */
export async function POST(req: NextRequest) {
    const user = await getCurrentUser(req)
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  try {
    const body = await req.json();
    const parsed = ModuleCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });
    }

    const module = await prisma.module.create({
      data: parsed.data,
    });

    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    console.error("Error creating module:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
  }
}



/**
 * @swagger
 * /api/modules:
 *   delete:
 *     summary: Delete a module
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
export async function DELETE(req: NextRequest) {
      const user = await getCurrentUser(req)
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Module id is required." }, { status: 400 });
    }

    const existingModule = await prisma.module.findUnique({
      where: { id },
    });
    
    if(!existingModule){
        return NextResponse.json({ message: "Module does not exist"}, { status: 404 });
    }

    await prisma.module.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Module deleted successfully." });
  } catch (error) {
    console.error("Error deleting module:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
  }
}


/**
 * @swagger
 * /api/modules:
 *   patch:
 *     summary: Update a module
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
 *               title:
 *                 type: string
 *               courseId:
 *                 type: string
 *               order:
 *                 type: number
 *     responses:
 *       200:
 *         description: Module updated successfully
 */
export async function PATCH(req: NextRequest) {
    const user = await getCurrentUser(req)
    if(!user){
      return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  try {
    const body = await req.json();
    const parsed = ModuleUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });
    }

    const { id, ...updateData } = parsed.data;

    const existingModule = await prisma.module.findUnique({where:{id}})

    if (!existingModule) {
      return NextResponse.json({ message: "Module does not exist." }, { status: 404 });
    }

    const updatedModule = await prisma.module.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedModule);
  } catch (error) {
    console.error("Error updating module:", error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });

  }
}
