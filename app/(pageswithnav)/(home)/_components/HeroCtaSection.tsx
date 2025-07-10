'use client';

import { BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroCTASection() {
  return (
    <section className="relative text-white py-20 px-6 md:px-20 bg-[#0F172A] overflow-hidden">
     
      <div className="absolute inset-0 z-0">
        <Image
          src="/cta.webp" 
          alt="Background"
          fill
          className="object-cover opacity-20"
        />
      </div>

     
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="flex justify-center items-center gap-2 mb-4 text-smegear-accent font-semibold uppercase text-sm tracking-wider">
          <BookText className="w-5 h-5" />
          <span>Are you ready to start learning</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
          We Simplify The CAC Registration Process
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mt-2">
          Through Our Comprehensive Courses
        </h2>

        <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed">
          Empower yourself with CAC's comprehensive and flexible online learning platform, and unlock a vast array of exciting opportunities to enhance your skills. Enroll now to embark on a journey towards a brighter future filled with possibilities and success.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="text-lg px-8 py-6 font-semibold bg-smegear-accent">
            Join With Us →
          </Button>
          <Button
            size="lg"
            className="text-lg px-8 py-6 font-semibold border border-white bg-transparent text-white hover:bg-white hover:text-black"
            variant="outline"
          >
            View All Course →
          </Button>
        </div>
      </div>

   
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20 z-0" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20 z-0" />
    </section>
  );
}
