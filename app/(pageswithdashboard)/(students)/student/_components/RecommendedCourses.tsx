'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

type Instructor = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type Lesson = {
  id: string;
  title: string;
  content?: string | null;
  videoUrl?: string | null;
  moduleId: string;
};

type Module = {
  id: string;
  title: string;
  order?: number;
  courseId: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;            // <-- from your payload
  price: number;               // 25000 (₦25,000)
  slug?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  instructor?: Instructor;
  modules?: Module[];
};

type Props = {
  data: Course[];              // <RecommendedCourses data={data} />
};

const currency = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0
});

const RecommendedCourses: React.FC<Props> = ({ data }) => {
  const displayedCourses = (data ?? []).slice(0, 6);

  return (
    <section className="space-y-6 p-4">
      <h2 className="md:text-2xl text-2xl font-bold text-gray-800">
        Recommended Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedCourses.map((course) => (
          <Link
            href={`/student/search/${course.id}`}
            className="no-underline"
            key={course.id}
          >
            <Card className="overflow-hidden shadow-lg rounded-xl bg-white pb-4 pt-0 hover:shadow-xl transition-shadow duration-300 group">
              <div className="overflow-hidden">
                <Image
                  src={course.imageUrl || '/placeholder.png'}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
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
    </section>
  );
};

export default RecommendedCourses;
