import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock3,
  BookText,
  Users,
  BarChart3,
  BadgeCheck,
  ArrowRight,
  BookOpen,
  SignalHigh,
  Clock,

} from "lucide-react";
import Image from "next/image";
import courses from "@/Data/popularcourseslist"
import Link from "next/link";


// ...existing code...
const PopularCourses = () => {
  // Only display the first 6 courses
  const displayedCourses = courses.slice(0, 6);

  return (
    <div className="bg-[#F4F5F4] py-16 px-4 md:px-12">
      <div className="flex md:justify-between flex-col items-center mb-8 md:flex-row">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-[16px] uppercase text-smegear-accent font-semibold flex justify-center gap-1 items-center md:justify-start ">
            <BookText size={18} />
            Popular Courses
          </p>
          <h2 className="md:text-4xl text-3xl font-bold mt-2 text-smegear-secondary">
            Our Popular Courses
          </h2>
        </div>
        <Link href="/courses">
        <Button className="px-9  py-7 bg-smegear-secondary text-white font-semibold uppercase">View All Courses →</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedCourses.map((course, index) => (
          <Link key={`course-${index}`} href={`/courses/popularcourses/${course.id}`} className="no-underline">
            <Card className="overflow-hidden shadow-lg rounded-xl transition-transform duration-300 bg-white py-0  hover:scale-[1.02] hover:shadow-xl cursor-pointer" key={index}>
              <Image
                src={course.image}
                alt={course.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array(5).fill(0).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-yellow-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.855 1.42 8.292L12 18.896l-7.419 4.557 1.42-8.292-6.001-5.855 8.332-1.151z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(5.00)</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {course.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" /> Lesson {course.lessons}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> Students {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <SignalHigh className="w-4 h-4" /> {course.level}
                  </span>
                  {course.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="text-base font-semibold text-primary">
                    Smegear
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {course.price}
                    </p>
                    {course.oldPrice && (
                      <p className="line-through text-lg  text-gray-400">
                        {course.oldPrice}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
