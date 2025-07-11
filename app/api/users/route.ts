import { getCurrentUser } from "@/lib/getServerSession";
import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

// User creation schema
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(6),
  role: z.enum(["STUDENT", "INSTRUCTOR", "ADMIN"]).optional(),
});

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
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
export async function GET() {
  const  user = await getCurrentUser()
  if(!user){
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
  }
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [STUDENT, INSTRUCTOR, ADMIN]
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Invalid request
 */
export async function POST(req: Request) {
    
  try {
     const body = await req.json();
    const parsed = CreateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });
    }

    const { email, name, password, role } = parsed.data;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: hashedPassword,
        role: role || "STUDENT",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Update a user
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
export async function PATCH(req: Request) {
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
        name: true,
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
export async function DELETE(req: Request) {
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