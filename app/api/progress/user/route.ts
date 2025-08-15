import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getCurrentUser } from "@/lib/getServerSession";

/**
 * @swagger
 * /api/progress/user:
 *   get:
 *     summary: Get all progress for a specific user
 *     tags: [Progress]
 *     parameters:
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User progress list
 */
export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req)
  const userId = user?.id
  try{
      const progress = await prisma.progress.findMany({
        where: { userId},
        include: {
          lesson: {
            include: {
              module: true,
            },
          },
        },
        orderBy: { updatedAt: "desc" },
      });
    
      return NextResponse.json(progress);
    
  } catch (error) {
      console.error("Error fetching user progress:", error);
          return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
    }
}
