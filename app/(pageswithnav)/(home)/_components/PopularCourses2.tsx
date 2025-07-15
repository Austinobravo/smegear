"use client";

import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import courses from "@/Data/popularcourseslist"
import {
  BookOpen,
  Users,
  SignalHigh,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";





const CoursesCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const displayedCourses = courses.slice(0, 6)
  return (
    <div className="bg-[#F4F5F4] py-16 px-4 md:px-12">
      <div className="flex md:justify-between flex-col items-center mb-8 md:flex-row">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm uppercase text-smegear-accent font-semibold">
            Popular Courses
          </p>
          <h2 className="md:text-4xl text-2xl font-bold mt-2 text-gray-800">
            Our Popular Courses
          </h2>
        </div>
        <Button className="px-9  py-7 bg-smegear-secondary text-white font-semibold uppercase">View All Courses →</Button>
      </div>


      <div className="relative">
        <Swiper
          slidesPerView={1.2}
          speed={2000}
          spaceBetween={20}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Navigation, Autoplay]}
          onBeforeInit={(swiper) => {

            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
        >
          {displayedCourses.map((course, index) => (
            <SwiperSlide key={index}>
              <Link href={`/courses/popularcourses/${course.id}`} className="no-underline">
                <Card className="overflow-hidden shadow-lg rounded-xl transition-transform duration-300 bg-white">
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
                          <p className="line-through text-sm text-gray-400">
                            {course.oldPrice}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>


        <div
          ref={prevRef}
          className="swiper-button-prev absolute top-1/2 -left-6 z-10 bg-gray-100 hover:bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </div>
        <div
          ref={nextRef}
          className="swiper-button-next absolute top-1/2 -right-6 z-10 bg-gray-100 hover:bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div >
  );
};

export default CoursesCarousel;
