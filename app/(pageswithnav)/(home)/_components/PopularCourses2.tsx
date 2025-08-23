"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookText } from "lucide-react";

type Course = {
  id: string | number;
  title: string;
  imageUrl: string;
  price?: string | number | null;
};

async function fetchAllCourses(): Promise<Course[]> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
      method: "GET",
      headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Course[] | { data: Course[] };
    return Array.isArray(data) ? data : (data?.data ?? []);
  } catch {
    return [];
  }
}

function formatPrice(value?: string | number | null) {
  if (value == null || value === "") return "—";
  if (typeof value === "number") {
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(value);
    } catch {
      return `₦ ${value.toLocaleString()}`;
    }
  }
  return value;
}

const CoursesCarousel = () => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const list = await fetchAllCourses();
      setCourses(list.slice(0, 6));
      setLoading(false);
    })();
  }, []);

  return (
    <div className="bg-[#F4F5F4] py-16 px-4 md:px-12">
      <div className="flex md:justify-between flex-col items-center mb-8 md:flex-row">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-[16px] uppercase text-smegear-accent font-semibold flex md:justify-start justify-center gap-1 items-center">
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

      <div className="relative">
        <Swiper
          slidesPerView={1.2}
          speed={500}
          spaceBetween={20}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          modules={[Navigation, Autoplay]}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
        >
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <SwiperSlide key={`skeleton-${i}`}>
                <Card className="overflow-hidden shadow-lg rounded-xl bg-white p-0">
                  <div className="w-full h-48 bg-gray-200 animate-pulse" />
                  <CardContent className="p-6 space-y-3">
                    <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}

          {!loading && courses.length === 0 && (
            <SwiperSlide>
              <div className="p-6 text-center text-gray-500">No courses available.</div>
            </SwiperSlide>
          )}

          {!loading &&
            courses.map((course) => (
              <SwiperSlide key={course.id}>
                <Link href={`/courses/popularcourses/${course.id}`} className="no-underline">
                  {/* No hover/group/scale classes on card or image */}
                  <Card className="overflow-hidden shadow-lg rounded-xl bg-white p-0">
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
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Swiper nav buttons */}
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
    </div>
  );
};

export default CoursesCarousel;
