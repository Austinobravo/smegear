"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  BookOpen,
  Users,
  SignalHigh,
  Clock,
  Landmark,
  Pencil,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { categories } from "@/data";


const CourseCategories = () => {
  return (
    <div className="p-6 md:p-12 bg-[#FEFFFE]">
      <div className="mb-8 text-center flex flex-col items-center">
        <div className="flex items-center gap-2 justify-center">
          <BookOpen className="w-7 h-5 text-smegear-secondary" />
          <p className="text-[16px] leading-[26px] text-smegear-secondary uppercase font-medium">
            Courses Categories
          </p>
        </div>
        <h2 className="lg:text-4xl text-2xl font-bold mt-2">Explore Top Categories</h2>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          speed={1200}
          slidesPerView={1.2}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Card className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full border-2">
                <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                  {/* {category.icon} */}
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <p className="text-[16px] text-smegear-accent">
                    {category.description}
                  </p>

                  <Link href={`/courses/${category.id}`}>
                    <Button className="mt-4 bg-smegear-secondary text-white text-[14px] leading-[14px] uppercase" variant="default">
                      Learn More
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}


        </Swiper>
      </div>

      <div className="text-center mt-10 flex justify-center w-full">
        <Button className="px-10 py-6 bg-smegear-secondary text-white font-semibold uppercase flex items-center gap-2 justify-center">
          <h4>View All Category</h4>
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default CourseCategories;
