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

const generateRandomDate = () => {
  const start = new Date(2022, 0, 1);
  const end = new Date(2025, 6, 1);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const courses = [{
  id: 1,
  title: "Business Name Post Incorporation",
  description: "The Business Name Post Incorporation Course Pack",
  image: "/popularimg1.webp",
  rating: 5,
  lessons: 11,
  students: 104,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦20,000.00",
  duration: null,
  oldPrice: null,
},
{
  id: 2,
  title: "Export Licence registration Course",
  description: "Introduction to Export License",
  image: "/popularimg2.webp",
  rating: 5,
  lessons: 2,
  students: 44,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦5,000.00",
  oldPrice: "₦10,000.00",
  duration: null,
},
{
  id: 3,
  title: "Copyright registration course",
  description: "Introduction to Copyright",
  image: "/popularimg3.webp",
  rating: 5,
  lessons: 4,
  students: 48,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦10,000.00",
  oldPrice: "₦20,000.00",
  duration: "1h",
},
{
  id: 4,
  title: "How to register group of company",
  description: "Introduction to Copyright",
  image: "/popularimg4.webp",
  rating: 5,
  lessons: 2,
  students: 23,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦5,000.00",
  oldPrice: "₦10,000.00",
  duration: "1h",
},
{
  id: 5,
  title: "Company Limited by gurantee Course",
  description: "Introduction to Copyright",
  image: "/popularimg5.webp",
  rating: 5,
  lessons: 2,
  students: 24,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦5,000.00",
  oldPrice: "₦10,000.00",
  duration: "1h",
},
{
  id: 6,
  title: "Intellectual property course bundle",
  description: "Introduction to Copyright",
  image: "/popularimg6.webp",
  rating: 0,
  lessons: 10,
  students: 9,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦15,000.00",
  oldPrice: "₦30,000.00",
  duration: "1h",
},
{
  id: 7,
  title: "Business Name Substitution",
  description: "Introduction to Copyright",
  image: "/businesses/businessnamesubstitution.webp",
  rating: 4.6,
  lessons: 2,
  students: 213,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦1,500.00",
  oldPrice: "",
  duration: "1h",
},
{
  id: 8,
  title: "Business Commencement Date Fine",
  description: "Introduction to Copyright",
  image: "/popularimg8.webp",
  rating: 5,
  lessons: 1,
  students: 34,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦1,500.00",
  oldPrice: "",
  duration: "1h",
},
{
  id: 9,
  title: "How to Download Letter of Good Standing",
  description: "Introduction to Copyright",
  image: "/popularimg9.webp",
  rating: 0,
  lessons: 1,
  students: 12,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦2,450.00",
  oldPrice: "",
  duration: "1h",
},

{
  id: 10,
  title: "Business Commencement Date Fine",
  description: "Everything about renewing your trademarks",
  image: "/businesses/businesscommencement.webp",
  rating: 4.8,
  lessons: 1,
  students: 34,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦1,500",
  oldPrice: "",
  duration: "1h",
},
{
  id: 11,
  title: "Complete Post Incorporation Course",
  description: "Everything about renewing your trademarks",
  image: "/businesses/completecacpost.webp",
  rating: 4.8,
  lessons: 33,
  students: 14,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦30,000",
  oldPrice: "",
  duration: "1h",
},
{
  id: 12,
  title: "Complete CAC Pre-incorporation",
  description: "Everything about renewing your trademarks",
  image: "/businesses/completecaccourse.webp",
  rating: 4.8,
  lessons: 14,
  students: 9,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦20,000",
  oldPrice: "",
  duration: "1h",
},
{
  id: 13,
  title: "NGO Post Incorporation Course",
  description: "Everything about renewing your trademarks",
  image: "/businesses/ngopostincorporationmcourse.webp",
  rating: 4.8,
  lessons: 7,
  students: 106,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦20,000",
  oldPrice: "",
  duration: "1h",
},
{
  id: 14,
  title: "Company Post Incorporation",
  description: "Everything about renewing your trademarks",
  image: "/businesses/companypostincorporationcourse.webp",
  rating: 4.8,
  lessons: 16,
  students: 111,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦20,000",
  oldPrice: "",
  duration: "1h",
},
{
  id: 15,
  title: "How to File Business Name Annual",
  description: "Everything about renewing your trademarks",
  image: "/businesses/businesnameannualreturns.webp",
  rating: 4.8,
  lessons: 2,
  students: 57,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦2,500",
  oldPrice: "",
  duration: "1h",
},
{
  id: 16,
  title: "Company Annual Returns Filling",
  description: "Everything about renewing your trademarks",
  image: "/businesses/companyannualreturns.webp",
  rating: 4.8,
  lessons: 2,
  students: 40,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦5,250",
  oldPrice: "",
  duration: "1h",
},
{
  id: 17,
  title: "NGO Annual Returns Filling",
  description: "Everything about renewing your trademarks",
  image: "/businesses/ngoannualreturns.webp",
  rating: 4.8,
  lessons: 2,
  students: 36,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦5,250",
  oldPrice: "",
  duration: "1h",
},
{
  id: 18,
  title: "Trademark Registration Course",
  description: "Everything about renewing your trademarks",
  image: "/businesses/trademarkregistrationcourse.webp",
  rating: 4.8,
  lessons: 5,
  students: 502,
  level: "Intermediate",
  author: "SmeGear",
  price: "₦10,000",
  oldPrice: "",
  duration: "1h",
},].map(course => ({
  ...course,
  date: generateRandomDate()
}));

export default function FilterCoursesPage() {
  const [sort, setSort] = useState("Course Title (a-z)");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 6;
  const totalPages = Math.ceil(courses.length / perPage);

  const sortedCourses = useMemo(() => {
    let sorted = [...courses];
    if (sort === "Release Date (newest first)") {
      sorted.sort((a, b) => b.date.getTime() - a.date.getTime());
    } else if (sort === "Release Date (oldest first)") {
      sorted.sort((a, b) => a.date.getTime() - b.date.getTime());
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
        <p className="text-xl font-semibold text-gray-900 ">
           <h4 className="font-bold text-2xl">{courses.length} <span className="text-gray-600 text-lg">courses</span></h4>  
        </p>
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
                  <div className="text-base font-semibold text-primary">{course.author}</div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{course.price}</p>
                    {course.oldPrice && <p className="line-through text-sm text-gray-400">{course.oldPrice}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
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
