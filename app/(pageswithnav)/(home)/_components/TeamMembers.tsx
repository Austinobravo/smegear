'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const teamMembers = [
  {
    name: 'Emmanuel',
    company: 'Director',
    image: '/emma.webp',
  },
  {
    name: 'Frank',
    company: 'Manager',
    image: '/frank.webp',
  },
  {
    name: 'Goodness',
    company: 'Executive Assistant',
    image: '/goodness.webp',
  },
  {
    name: 'Nagapiya',
    company: 'Branding Manager',
    image: '/napi.webp',
  },
  {
    name: 'Ebuka',
    company: 'Software Developer',
    image: '/ebuka.webp',
  },
  {
    name: 'Israel',
    company: 'Graphics Designer',
    image: '/israel_graphics.webp',
  },
];

export default function TeamCarousel() {
  return (
    <div className="w-full px-4 py-10">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <Card className="rounded-full border-none shadow-none bg-transparent text-center flex flex-col items-center">
              <div className="relative w-[260px] h-[260px] rounded-full border-[6px] border-smegear-secondary overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={250}
                  height={250}
                  className="object-cover"
                />
                
              </div>
              <CardContent className=" space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-md text-blue-600">{member.company}</p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
