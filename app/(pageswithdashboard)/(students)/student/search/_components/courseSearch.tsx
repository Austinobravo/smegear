"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  Users,
  SignalHigh,
  Search,
  X
} from "lucide-react";
import Image from "next/image";
import courses from "@/Data/popularcourseslist";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const PopularCourses = () => {
 const searchParams = useSearchParams();
const query = searchParams.get("q")?.toLowerCase() || "";

const filteredCourses = courses.filter(course =>
  course.title.toLowerCase().includes(query)
);
 



  return (
    <div className="bg-[#F4F5F4] py-10 px-4 md:px-12 space-y-8">
      <h2 className="md:text-3xl text-2xl font-bold  text-gray-800">
            Search Courses
          </h2>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <Link
            href={`/student/search/${course.id}`}
            className="no-underline"
            key={index}
          >
            <Card className="overflow-hidden shadow-lg rounded-xl transition-transform duration-300 bg-white hover:scale-[1.02] hover:shadow-xl pb-4 pt-0">
              <Image
                src={course.image}
                alt={course.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="px-6 space-y-4">
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
                      <p className="line-through text-sm text-gray-400">
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

      {/* View All Courses Button */}
      {/* <div className="flex justify-center">
        <Link href="/courses">
          <Button className="px-9 py-7 bg-smegear-secondary text-white font-semibold uppercase hover:bg-smegear-accent">
            View All Courses →
          </Button>
        </Link>
      </div> */}
    </div>
  );
};

export default PopularCourses;
