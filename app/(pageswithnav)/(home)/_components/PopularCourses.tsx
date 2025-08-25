// app/components/PopularCourses.tsx (Server Component)
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";
import { fetchAllCourses } from "@/lib/fetchAllCourses";



export default async function PopularCourses() {
  const courses = await fetchAllCourses();
  const displayedCourses = courses.slice(0, 6);

  return (
    <div className="bg-[#F4F5F4] py-16 px-4 md:px-12">
      <div className="flex md:justify-between flex-col items-center mb-8 md:flex-row">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-[16px] uppercase text-smegear-accent font-semibold flex justify-center gap-1 items-center md:justify-start">
            <BookText size={18} />
            Popular Courses
          </p>
          <h2 className="md:text-4xl text-3xl font-bold mt-2 text-smegear-secondary">
            Our Popular Courses
          </h2>
        </div>
        <Link href="/courses">
          <Button className="px-9 py-7 bg-smegear-secondary text-white font-semibold uppercase">
            View All Courses →
          </Button>
        </Link>
      </div>

      {displayedCourses.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={`skeleton-${i}`}
              className="overflow-hidden shadow-lg rounded-xl bg-white animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200" />
              <CardContent className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                <div className="flex items-center justify-between pt-4">
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedCourses.map((course, index) => (
            <Link
              key={`course-${index}`}
              href={`/courses/${course.id}`}
              className="no-underline"
            >
              <Card className="overflow-hidden shadow-lg rounded-xl bg-white  p-0 group">
                <div className="overflow-hidden">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    width={600}
                    height={400}
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <CardContent className="px-6 space-y-4 pb-6">
                  <h3 className=" cursor-pointer text-lg font-semibold text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-base font-semibold text-primary">
                      Smegear
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary text-smegear-accent">
                        ₦ {course.price ?? "—"}
                      </p>
                    </div>
                  </div>

                  
                </CardContent>
              </Card>


            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
