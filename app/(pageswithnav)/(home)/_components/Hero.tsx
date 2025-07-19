"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginForm from "./LoginForm";


export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat md:h-[138vh] flex items-center px-6 md:px-10 md:py-24 py-5"
      style={{
        backgroundImage: "url('/smilingman.webp')",
      }}
    >

      <div className="absolute inset-0 bg-[#0F172A] opacity-75 z-0" />


      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center  max-w-7xl mx-auto w-full md:px-6 py-24 gap-4">

        <div className="text-white">
          <div className=" flex  items-center gap-4 ">
            <span className="md:inline-block bg-smegear-accent md:text-lg font-semibold md:px-5 md:py-3 rounded-full  py-2 px-4">
              35% OFF
            </span>
            <h2 className="text-[16px] md:text-xl font-bold uppercase md:mb-2 tracking-wide leading-[56px]">
              Earn 6 figure with our
            </h2>
          </div>

          <h1 className="text-[30px] md:text-5xl font-bold md:leading-[56px] leading-[46px] uppercase my-5">
            CAC Portal Navigation   Video
            Course
          </h1>
          <p className="text-[16px] md:text-base mb-8 max-w-lg leading-relaxed text-white/90">
            Whether you're a seasoned marketer or just starting out, this course
            is tailored to meet your unique needs and support your financial
            goals. So why wait? Join now and take the first step towards
            achieving unparalleled success in your career.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-smegear-accent text-white hover:bg-indigo-700 transition flex items-center gap-2 px-9 py-7 rounded-md text-sm md:text-base font-semibold">
                Get Started <ArrowRight size={16} />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md p-0 border-2 rounded-lg shadow-xl">
              {/* Remove DialogHeader to mimic card layout */}
              <div className="w-full  overflow-hidden">
                <LoginForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="overflow-hidden rounded-full w-[320px] h-[320px] md:w-[600px] md:h-[600px]">
            <Image
              src="/nonsmilingman.webp"
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
