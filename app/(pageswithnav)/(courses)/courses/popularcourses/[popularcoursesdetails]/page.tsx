"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Users, Star, FileText, Tag } from "lucide-react";
import Image from "next/image";
import courses from "@/Data/popularcourseslist"
import { ca } from "zod/v4/locales";


interface PageProps {
  params: { popularcoursesdetails: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  const categoryId = parseInt(params.popularcoursesdetails);
  const category = courses.find((cat) => cat.id === categoryId);

  if (!category) return notFound();
  return (
    <div className="max-w-7xl mx-auto p-6 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <Image
                src={category.image}
                alt={category.title}
                width={1000}
                height={600}
                className="rounded-t-xl w-full h-[400px] object-cover"
              />
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" /> Students: {category.students}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> Views: {category.Views}
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-2">
              {category.description}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText size={16} /> Category: {category.Category}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} /> Last Updated: {category.UpdatedAt}
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500" /> 5.0
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="bg-white">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {category.description}
              </p>
            </TabsContent>
            <TabsContent value="curriculum" className="mt-4">
              <p className="text-muted-foreground text-sm">
                Curriculum details will go here.
              </p>
            </TabsContent>
            <TabsContent value="instructor" className="mt-4">
              <p className="text-muted-foreground text-sm">
                Instructor profile and bio.
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <p className="text-muted-foreground text-sm">Ratings and reviews.</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="p-4">
            <CardContent className="flex flex-col gap-4">
              <Image
                src={category.image}
                alt={category.title}
                width={400}
                height={300}
                className="rounded-md"
              />
              <h3 className="text-2xl font-bold text-gray-800">{category.price}</h3>
              <Button className="w-full bg-smegear-secondary text-white text-lg">
                Buy Now
              </Button>

              <div className="border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">Course Information</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  {category.info.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full border border-smegear-secondary text-smegear-secondary"
          >
            Share This Course
          </Button>
        </div>
      </div>
    </div>
  );
};


