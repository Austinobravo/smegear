"use client";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    name: "Adedeji Ademola",
    role: "Software Developer",
    image: "/testimonial1.webp",
    message:
      "I took my time to watch all the videos. Thereafter I began to implement all that I had learnt in the videos when clients began to reach out to me for their registration. I had done several registration since then. The videos and the course at large was quite explanatory, simple and precise",
  },
  {
    name: "Anonymous",
    role: "Entrepreneur",
    image: "/testimonial3.webp",
    message:
      "There’s a time in an individual’s life when certain decision causes a swift change in one’s life, I took the Smegear CAC Course and I can say; I am currently enjoying the impact of the decision. The course was explanatory enough and when the need for any clarification arises, Smegear ensures that responses are not delayed.",
  },
  {
    name: "Mrs Olufunmi",
    role: "Baker",
    image: "/testimonial2.webp",
    message:
      "The CAC Registration bizness has always been a blessings to me, I am doing well in d field, I have successfully registered so many names and it doesn’t affect my other occupation. I am also a Baker and a4 decorator... Thanks to my able boss Mr Olusayo Omope, for d continual teaching, training, counselling and mentorship.",
  },
  {
    name: "Jane Doe",
    role: "Freelancer",
    image: "/testimonial4.webp",
    message:
      "The training gave me a big boost. I now understand the CAC registration process clearly and confidently handle multiple client registrations. It’s the best online learning experience I’ve had!",
  },
  {
    name: "John Smith",
    role: "Business Consultant",
    image: "/testimonial5.webp",
    message:
      "As a consultant, the Smegear course helped sharpen my delivery. The support and clarity offered by the course is unmatched. Highly recommend for anyone in the business registration space.",
  },
  {
    name: "Sarah Ike",
    role: "Student Entrepreneur",
    image: "/testimonial6.webp",
    message:
      "I was skeptical at first, but I’m glad I enrolled. The knowledge I gained has enabled me to open my own registration agency. The mentorship helped a lot!",
  },
];

const TestimonialsCarousel = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-12">
      <div className="text-center mb-12">
        <p className="text-sm uppercase text-blue-700 font-semibold">
          Our Students Testimonials
        </p>
        <h2 className="text-4xl font-bold mt-2 text-gray-800">
          Hear From Our Students
        </h2>
      </div>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={20}
        breakpoints={{
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Card className="h-full p-6 shadow-md rounded-xl border">
              <CardContent className="space-y-4">
                <div className="flex text-yellow-500">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500" />
                    ))}
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  “{testimonial.message}”
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-primary text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsCarousel;
