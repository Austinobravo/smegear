import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock3,
  BookText,
  Users,
  BarChart3,
  BadgeCheck,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

const courses = [
  {
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
    discount: null,
  },
  {
    title: "Export Licence registration Course",
    description: "Introduction to Export License",
    image: "/popularimg2.webp",
    rating: 5,
    lessons: 2,
    students: 44,
    level: "Intermediate",
    author: "SmeGear",
    price: "₦5,000.00",
    discount: "₦10,000.00",
    duration: null,
  },
  {
    title: "Copyright registration course",
    description: "Introduction to Copyright",
    image: "/popularimg3.webp",
    rating: 5,
    lessons: 4,
    students: 48,
    level: "Intermediate",
    author: "SmeGear",
    price: "₦10,000.00",
    discount: "₦20,000.00",
    duration: "1h",
  },
  {
    title: "How to register group of company",
    description: "Introduction to Copyright",
    image: "/popularimg4.webp",
    rating: 5,
    lessons: 2,
    students: 23,
    level: "Intermediate",
    author: "SmeGear",
    price: "₦5,000.00",
    discount: "₦10,000.00",
    duration: "1h",
  },
   {
    title: "Company Limited by gurantee Course",
    description: "Introduction to Copyright",
    image: "/popularimg5.webp",
    rating: 5,
    lessons: 2,
    students: 24,
    level: "Intermediate",
    author: "SmeGear",
    price: "₦5,000.00",
    discount: "₦10,000.00",
    duration: "1h",
  },
   {
    title: "Intellectual property course bundle",
    description: "Introduction to Copyright",
    image: "/popularimg6.webp",
    rating: 0,
    lessons: 10,
    students: 9,
    level: "Intermediate",
    author: "SmeGear",
    price: "₦15,000.00",
    discount: "₦30,000.00",
    duration: "1h",
  },
   {
    title: "Business Name Substitution",
    description: "Introduction to Copyright",
    image: "/popularimg3.webp",
    rating: 4.6,
    lessons: 2,
    students: 213,
    level: "Intermediate",
    author: "SmeGear",
    price: "₦1,500.00",
    discount: "",
    duration: "1h",
  },
   {
    title: "Business Commencement Date Fine",
    description: "Introduction to Copyright",
    image: "/popularimg8.webp",
    rating: 5,
    lessons: 1,
    students: 34,
    level: "Intermediate",
    author: "SmeGear",
    price: "₦1,500.00",
    discount: "",
    duration: "1h",
  },
   {
    title: "How to Download Letter of Good Standing",
    description: "Introduction to Copyright",
    image: "/popularimg9.webp",
    rating: 0,
    lessons: 1,
    students: 12,
    level: "Intermediate",
    author: "SmeGear",
    price: "₦2,450.00",
    discount: "",
    duration: "1h",
  },
];

const PopularCourses = () => {
  return (
    <div className="p-6 md:p-12 bg-white">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <p className=" text-smegear-accent text-sm text-muted-foreground uppercase font-medium">
            Popular Courses
          </p>
          <h2 className="text-3xl text-smegear-secondary font-bold mt-2">Our Popular Courses</h2>
        </div>
        <Button className="px-10 py-6 bg-smegear-secondary text-white font-semibold uppercase">
          <h4>
            View All Courses
          </h4>

          <ArrowRight size={50} className=' ' />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Card key={index} className="rounded-xl overflow-hidden shadow-md">
            {course.image && (
              <div className="relative w-full h-64">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={500}
                  height={500}
                  className="object-cover"
                />
                {course.duration && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    <Clock3 className="inline w-3 h-3 mr-1" /> {course.duration}
                  </span>
                )}
              </div>
            )}
            <CardContent className="p-4 space-y-2 relative top-[30px]">
              <div className="text-sm text-muted-foreground">★★★★★ ({course.rating.toFixed(2)})</div>
              <h3 className="font-semibold text-lg leading-tight">
                {course.title}
              </h3>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-1">
                  <BookText className="w-4 h-4" /> Lesson {course.lessons}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> Students {course.students}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" /> {course.level}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <BadgeCheck className="w-4 h-4" /> {course.author}
              </div>
              <div className="text-primary font-bold text-lg mt-2">
                {course.price}{" "}
                {course.discount && (
                  <span className="line-through text-sm text-muted-foreground ml-1">
                    {course.discount}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
