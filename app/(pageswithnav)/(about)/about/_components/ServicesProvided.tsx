"use client";

import { BookText, GraduationCap, LayoutDashboard, Presentation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const courses = [
  {
    icon: <Presentation size={36} className="text-white group-hover:text-smegear-secondary" />,
    title: "Train Student Online",
    description:
      "Experience seamless navigation through CAC portal by enrolling in our comprehensive courses.",
  },
  {
    icon: <GraduationCap size={36} className="text-white group-hover:text-smegear-secondary" />,
    title: "Expert Guidance",
    description:
      "We guide our students, providing them with helpful resources and tips on how they can register brands",
  },
  {
    icon: <LayoutDashboard size={36} className="text-white group-hover:text-smegear-secondary" />,
    title: "Brand Registration",
    description:
      "We help businesses, companies, NGOs register their brand on the CAC portal effortlessly.",
  },
];

export default function CoursesSection() {
  return (
    <section className=" px-4 lg:px-10 text-center mb-20">
      <p className="text-smegear-secondary text-[18px] font-medium uppercase tracking-wide flex justify-center items-center gap-2">
        <BookText size={20} />
        What We Do
      </p>
      <h2 className="text-3xl md:text-[40px] font-extrabold text-gray-900 mt-4 mb-16">
        CAC Online Courses Tailored to You
      </h2>

     <div className="flex max-w-7xl mx-auto justify-center gap-8 md:flex-row flex-col px-4">
  {courses.map((item, index) => (
    <Card
      key={index}
      className="group relative overflow-hidden text-center md:w-[350px] transition-all duration-300 ease-in-out  border-gray-200 shadow hover:shadow-lg hover:-translate-y-1 hover:bg-smegear-secondary border-2"
    >
      <div className="rounded-full w-28 h-28 flex items-center justify-center mx-auto  transition-all group-hover:scale-105 bg-smegear-secondary group-hover:bg-white ">
        <span className=" text-4xl transition-colors duration-300 ">
          {item.icon}
        </span>
      </div>

      <CardContent>
        <h3 className="text-[24px] font-semibold text-gray-900 mb-3 group-hover:text-white">
          {item.title}
        </h3>
        <p className="text-gray-600 text-[16px] group-hover:text-white">{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>

    </section>
  );
}
