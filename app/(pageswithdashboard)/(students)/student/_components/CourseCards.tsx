'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Book, CheckCircle, Clock } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import courses from '@/Data/popularcourseslist'



export default function CourseCards() {
   const displayedCourses = courses.slice(0, 3);
  const inProgressCount = displayedCourses.filter(course => course.progress < 100).length
  const completedCount = displayedCourses.filter(course => course.progress === 100).length

  return (
    <div className="space-y-8 p-4">
      <h2 className=" text-2xl font-bold  text-gray-800">
        Purchased Courses
      </h2>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-4 shadow-sm w-full sm:w-auto">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">In Progress</p>
            <p className="text-xs text-muted-foreground">{inProgressCount} Courses</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-4 shadow-sm w-full sm:w-auto">
          <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">Completed</p>
            <p className="text-xs text-muted-foreground">{completedCount} Courses</p>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCourses.map((course, index) => (
          <Card key={index} className="shadow-sm py-0 transition-transform duration-300 bg-white hover:scale-[1.02] hover:shadow-xl cursor-pointer">
            <CardHeader className="p-0">
              <Image
                src={course.image}
                alt={course.title}
                width={500}
                height={300}
                className="w-full h-32 object-cover rounded-t-md"
              />
            </CardHeader>

            <CardContent className="space-y-1 pt-4 px-4">
              <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
              <CardDescription className="text-muted-foreground text-sm">{course.Category}</CardDescription>
              <p className="text-muted-foreground text-sm">{course.Category}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Book size={14} />
                <span>{course.chapters} Chapters</span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-1 px-4 pb-4">
              <Progress value={course.progress} className="w-full h-2" />
              <p className="text-xs text-muted-foreground">
                {course.progress}% Complete
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
