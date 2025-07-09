"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat md:h-[120vh] flex items-center px-6 md:px-10 py-20 "
      style={{
        backgroundImage: "url('/smilingman.webp')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center  max-w-7xl mx-auto w-full md:px-6">
        {/* Left - Text Content */}
        <div className="text-white">
          <div className="md:items-start flex md:flex-col items-center gap-4 md:gap-0">
            <span className="md:inline-block bg-smegear-accent md:text-lg font-semibold md:px-5 md:py-3 rounded-full md:mb-4 py-2 px-4">
              35% OFF
            </span>
            <h2 className="text-[14px] md:text-2xl font-semibold uppercase md:mb-2 tracking-wide leading-[56px]">
              Earn 6 figure with our
            </h2>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold md:leading-[56px] leading-[40px] uppercase mb-6">
            CAC Portal Navigation  <br /> Video
             Course
          </h1>
          <p className="text-sm md:text-base mb-8 max-w-lg leading-relaxed text-white/90">
            Whether you're a seasoned marketer or just starting out, this course
            is tailored to meet your unique needs and support your financial
            goals. So why wait? Join now and take the first step towards
            achieving unparalleled success in your career.
          </p>

          <Button className="bg-smegear-accent text-white hover:bg-indigo-700 transition flex items-center gap-2 px-9 py-7 rounded-md text-sm md:text-base font-semibold">
            Get Started <ArrowRight size={16} />
          </Button>
        </div>

        {/* Right - Rounded Image */}
        <div className="hidden md:flex justify-center">
          <div className="overflow-hidden rounded-full w-[320px] h-[320px] md:w-[600px] md:h-[600px]">
            <Image
              src="/nonsmilingman.webp" // Replace with your image
              alt="Thumbs Up with Money"
              width={900}
              height={900}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
