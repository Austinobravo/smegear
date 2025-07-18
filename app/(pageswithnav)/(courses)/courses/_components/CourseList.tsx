"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BookOpen, Users, SignalHigh, Clock, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import courses from "@/Data/popularcourseslist"



export default function FilterCoursesPage() {
  const [sort, setSort] = useState("Course Title (a-z)");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 6;
  const totalPages = Math.ceil(courses.length / perPage);

  const sortedCourses = useMemo(() => {
    let sorted = [...courses];
    if (sort === "Release Date (newest first)") {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === "Release Date (oldest first)") {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sort === "Course Title (a-z)") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "Course Title (z-a)") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sorted;
  }, [sort]);

  const paginatedCourses = useMemo(() => {
    const start = (page - 1) * perPage;
    return sortedCourses.slice(start, start + perPage);
  }, [page, sortedCourses]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setLoading(true);
    setTimeout(() => {
      setPage(newPage);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8 mb-10">
      <div className="flex flex-col sm:flex-row justify-between  items-center bg-gray-300 py-6 px-8 rounded-lg gap-4">
        <div className="text-xl font-semibold text-gray-900 ">
          <h4 className="font-bold text-2xl">{courses.length} <span className="text-gray-600 text-lg">courses</span></h4>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="border flex items-center gap-2 rounded px-6 py-4  bg-white text-[16px] ">
            <span>{sort}</span>
            <div>

              <ChevronDown size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white  ">
            {["Release Date (newest first)", "Release Date (oldest first)", "Course Title (a-z)", "Course Title (z-a)"].map(option => (
              <DropdownMenuItem key={option} onSelect={() => setSort(option)} className="hover:bg-gray-300">
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-gray-500 text-lg">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.map((course) => (
            <Link href={`/courses/popularcourses/${course.id}`} className="no-underline">
              <Card key={course.id} className="overflow-hidden shadow rounded-xl">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Lesson {course.lessons}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Students {course.students}</span>
                    <span className="flex items-center gap-1"><SignalHigh className="w-4 h-4" /> {course.level}</span>
                    {course.duration && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>}
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-base font-semibold text-primary">{course.instructor}</div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{course.price}</p>
                      {course.oldPrice && <p className="line-through text-sm text-gray-400">{course.oldPrice}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-2 my-8">
        <button onClick={() => handlePageChange(page - 1)} className="px-4 py-2 border rounded">Previous</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => handlePageChange(n)}
            className={`px-3 py-1 border rounded ${n === page ? "bg-gray-200 font-bold" : ""}`}
          >
            {n}
          </button>
        ))}
        <button onClick={() => handlePageChange(page + 1)} className="px-4 py-2 border rounded">Next</button>
      </div>
    </div>
  );
}
