import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, BookOpen, Landmark, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Company Registration",
    description: "Comprehensive Courses",
    icon: <Landmark className="w-8 h-8 text-blue-600" />, // Example icon
  },
  {
    title: "NGO Brand Registration",
    description: "Comprehensive Courses",
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "NGO Post Incorporation",
    description: "Comprehensive Courses",
    icon: <Pencil className="w-8 h-8 text-blue-600" />,
  },
];

const CourseCategories = () => {
  return (
    <div className="p-6 md:p-12 bg-white">
      <div className="mb-8 text-center">
        <p className="text-[16px] leading-[26px] text-smegear-secondary uppercase font-medium">
          Courses Categories
        </p>
        <h2 className="text-3xl  font-bold mt-2">Explore Top Categories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-6 text-center flex flex-col items-center gap-4">
              {category.icon}
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
              <Button className="mt-4 bg-smegear-secondary text-white text-[14px] leading-[14px] uppercase" variant="default">
                Learn More
                <ArrowRight size={50} className=' ' />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button className="px-10 py-6 bg-smegear-secondary text-white font-semibold uppercase">
          <h4>
            View All Category
          </h4>

          <ArrowRight size={50} className=' ' />
        </Button>
      </div>
    </div>
  );
};

export default CourseCategories;
