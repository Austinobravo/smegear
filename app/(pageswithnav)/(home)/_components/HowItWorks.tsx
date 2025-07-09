'use client';

import { GraduationCap, CreditCard, BookOpenCheck } from 'lucide-react';
import Image from 'next/image';

export default function HowItWorks() {
  const steps = [
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      image: '/howitwork.png',
      title: 'Choose Any Courses',
      desc: 'Explore our extensive collection of CAC online courses and find the one that perfectly fits your requirements.',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-white" />,
      image: '/howitwork2.png',
      title: 'Purchase Your Course',
      desc: 'Effortlessly enroll in your desired course with our user-friendly interface that is specifically designed to cater to all your needs.',
    },
    {
      icon: <BookOpenCheck className="w-6 h-6 text-white" />,
      image: '/howitwork3.png',
      title: 'Great! Start Learn',
      desc: 'Dive headfirst into a wealth of knowledge that will open the door to endless possibilities for your future.',
    },
  ];

  return (
    <section className="py-16 px-6 text-center">
      <div className="text-indigo-600 font-semibold text-sm tracking-wide flex justify-center items-center gap-2 mb-2">
        <GraduationCap className="w-5 h-5" />
        <span>LEARN WITH EASE</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
        How Smegear Academy Works?
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-12 relative">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 max-w-sm mx-auto relative">
            {/* Icon badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10">
              {step.icon}
            </div>

            {/* Image */}
            <div className="rounded-xl overflow-hidden mt-6">
              <Image
                src={step.image}
                alt={step.title}
                width={300}
                height={200}
                className="rounded-xl mx-auto"
              />
            </div>

            {/* Text */}
            <div className="mt-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed mt-2">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Connector line */}
      <div className="absolute inset-x-0 top-[230px] hidden md:block">
        <svg viewBox="0 0 1200 100" fill="none" className="mx-auto w-full max-w-5xl text-indigo-300">
          <path
            d="M100 50 C 250 0, 350 100, 500 50 S 750 0, 900 50"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
          />
        </svg>
      </div>
    </section>
  );
}
