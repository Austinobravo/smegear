import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getCurrentUser } from "@/lib/getServerSession";

/**
 * @swagger
 * /api/enrollments/me:
 *   get:
 *     summary: Get the current user's enrollments (courses only)
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: List of enrolled courses
 *       401:
 *         description: Unauthorized
 */
export async function GET(req:NextRequest) {
  const user = await getCurrentUser(req);
  if (!user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try{
      const enrollments = await prisma.enrollment.findMany({
        where: { userId: user.id },
        include: {
          course: {
            select: { id: true, title: true, slug: true, imageUrl: true, price: true, published: true },
          },
        },
        orderBy: { enrolledAt: "desc" },
      });
    
      // Return only the course objects to keep the payload clean
      const courses = enrollments.map((e) => e.course);
      return NextResponse.json({ data: courses });
      
    }catch(error){
        console.log("Error", error)
        return NextResponse.json({ error: error });
  }

}
