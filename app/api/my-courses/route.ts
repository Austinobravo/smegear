import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getCurrentUser } from "@/lib/getServerSession";

/**
 * @swagger
 * /api/my-courses:
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
            include:{
              modules:{
                include:{
                  lessons:true
                }
              },
              reviews: true
            }
          },
        },
        orderBy: { enrolledAt: "desc" },
      });
    

      const courses = enrollments.map((e) => e.course);
      return NextResponse.json({ data: courses });
      
    }catch(error){
        console.log("Error", error)
        return NextResponse.json({ error: error });
  }

}
