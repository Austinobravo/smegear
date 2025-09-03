import { getCurrentUser } from "@/lib/getServerSession";
import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



// User update schema
const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["STUDENT", "INSTRUCTOR", "ADMIN"]).optional(),
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: My profile
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: My profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 */
export async function GET(req:NextRequest) {
  const  user = await getCurrentUser(req)
  if(!user){
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
  }
  const foundUser = await prisma.user.findUnique({where:{id:user?.id}, omit:{passwordHash:true}});
  return NextResponse.json(foundUser);
}



/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Update a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [STUDENT, INSTRUCTOR, ADMIN]
 *     responses:
 *       200:
 *         description: User updated successfully
 */
export async function PATCH(req: NextRequest) {
    const user = await getCurrentUser(req)
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
  try {
    const body = await req.json();
    const parsed = UpdateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });
    }

    const { id, name, password, role } = parsed.data;

    let updateData: any = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
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
 *         description: User deleted successfully
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
      return NextResponse.json({ message: "User id is required." }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}