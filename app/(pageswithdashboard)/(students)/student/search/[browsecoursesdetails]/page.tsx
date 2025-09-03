// app/(courses)/courses/[coursedetails]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchAllCourses } from "@/lib/fetchAllCourses";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  LayoutList,
  User,
  Star,
  PlayCircle,
  Lock,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Users,
  FileText,
  Calendar,
  Eye,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ModalLoginForm from "@/components/globals/ModalLoginForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import PaystackBuyButton from "@/app/(pageswithnav)/payment/_components/PaystackBuyButton";



type Lesson = {
  id: string | number;
  title: string;
  order?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type Module = {
  id: string | number;
  title: string;
  order?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  lessons?: Lesson[];
};

type Course = {
  id: string | number;
  title: string;
  imageUrl: string;
  price?: string | number | null;
  description?: string | null;
  slug?: string | null;
  students?: number | null;
  views?: number | null;
  category?: string | null;
  updatedAt?: string | null;
  info?: string[];
  published?: boolean | null;
  // ⬇️ modules coming from your backend
  modules?: Module[];
};

export const revalidate = 300;

type PageProps = {
  params: Promise<{ browsecoursesdetails: string }>;
};

const reviews = [
  {
    id: 1,
    name: "Adewumi Taiwo Elizabeth",
    rating: 5,
    timeAgo: "1 month ago",
    comment: "Detailed",
    avatar: "/testimonial1.webp",
  },
];

const instructorInfo = {
  name: "Smegear Academy",
  contact: "Mobile Number: +2348161195352",
  profileImage: "/emma.webp",
  courses: 25,
  students: 2786,
  socials: [
    { icon: Facebook, url: "#" },
    { icon: Twitter, url: "#" },
    { icon: Linkedin, url: "#" },
    { icon: Github, url: "#" },
  ],
};

function formatPrice(price?: string | number | null) {
  if (price === null || price === undefined || price === "") return "Free";
  const asNumber = typeof price === "string" ? Number(price) : price;
  if (!Number.isFinite(asNumber)) return String(price);

  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(asNumber as number);
  } catch {
    return String(price);
  }
}

export async function generateStaticParams() {
  const courses = await fetchAllCourses();
  return courses.map((c) => ({ browsecoursesdetails: String(c.id) }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const browsecoursesdetails = (await params).browsecoursesdetails;

  const courses = await fetchAllCourses();
  const course: Course | undefined = courses.find(
    (c) => String(c.id) === String(browsecoursesdetails)
  );

  if (!course) return notFound();

  const modules: Module[] = Array.isArray(course.modules) ? course.modules : [];

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6  md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0">
            <CardContent className="p-0">
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={1000}
                height={600}
                className="rounded-t-xl w-full h-[400px] object-cover"
                priority
              />
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center gap-6 text-[16px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 bg-[#F3F6FA] rounded-full " />{" "}
                Students: {course.students ?? 0}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 bg-[#F3F6FA] rounded-full " />{" "}
                Views: {course.views ?? 0}
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-4">
              {course.title ?? "No title available"}
            </h2>

            <div className="flex items-center gap-4 mt-4 text-[16px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={20} /> Last Updated:{" "}
                {course.updatedAt
                  ? new Date(course.updatedAt).toISOString().split("T")[0]
                  : "—"}
              </div>
              <div className="flex items-center gap-2">
                <Star size={20} className="text-yellow-500" /> 5.0
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mt-10">
            <TabsList className="bg-white  justify-start pt-4">
              <TabsTrigger
                value="overview"
                className="text-[17px] font-bold flex items-center md:gap-3  md:p-8 border-b-2 border-transparent data-[state=active]:border-b-smegear-secondary data-[state=active]:text-smegear-secondary bg-[#F3F6FA] data-[state=active]:bg-white text-gray-800 py-8 rounded-none transition-all border-b-gray-200"
              >
                <BookOpen size={24} /> Overview
              </TabsTrigger>

              <TabsTrigger
                value="curriculum"
                className="text-[17px] font-bold flex items-center md:gap-3  md:p-8 border-b-2 border-transparent data-[state=active]:border-b-smegear-secondary data-[state=active]:text-smegear-secondary bg-[#F3F6FA] data-[state=active]:bg-white text-gray-800 py-8 rounded-none transition-all border-b-gray-200"
              >
                <LayoutList size={24} /> Curriculum
              </TabsTrigger>

              <TabsTrigger
                value="instructor"
                className="text-[17px] font-bold flex items-center md:gap-3  md:p-8 border-b-2 border-transparent data-[state=active]:border-b-smegear-secondary data-[state=active]:text-smegear-secondary bg-[#F3F6FA] data-[state=active]:bg-white text-gray-800 py-8 rounded-none transition-all border-b-gray-200"
              >
                <User size={24} /> Instructor
              </TabsTrigger>

              <TabsTrigger
                value="reviews"
                className="text-[17px] font-bold flex items-center md:gap-3  md:p-8 border-b-2 border-transparent data-[state=active]:border-b-smegear-secondary data-[state=active]:text-smegear-secondary bg-[#F3F6FA] data-[state=active]:bg-white text-gray-800 py-8 rounded-none transition-all border-b-gray-200"
              >
                <Star size={24} /> Reviews
              </TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="mt-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  About The Course
                </h2>
                <p className="text-lg text-muted-foreground">
                  {course.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  What Will You Learn
                </h2>
                <p className="text-lg text-muted-foreground">
                  {course.slug
                    ? course.slug.charAt(0).toUpperCase() + course.slug.slice(1)
                    : "—"}
                  .
                </p>
              </div>
            </TabsContent>

            {/* Curriculum — now driven by course.modules */}
            <TabsContent value="curriculum" className="mt-8 space-y-5">
              <h2 className="text-[22px] font-bold">Course Modules</h2>

              {modules.length === 0 ? (
                <p className="text-muted-foreground text-lg">No modules yet.</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {modules
                    .slice()
                    .sort(
                      (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
                    )
                    .map((m, mIdx) => (
                      <AccordionItem key={String(m.id)} value={`module-${mIdx}`}>
                        <AccordionTrigger className="text-lg font-bold text-indigo-900 bg-indigo-50 px-6 py-4 rounded-md">
                          {m.title || `Module ${mIdx + 1}`}
                        </AccordionTrigger>

                        {(m.lessons ?? [])
                          .slice()
                          .sort(
                            (a, b) =>
                              (a.order ?? Number.MAX_SAFE_INTEGER) -
                              (b.order ?? Number.MAX_SAFE_INTEGER)
                          )
                          .map((lesson, lIdx) => (
                            <AccordionContent
                              key={String(lesson.id) || `${mIdx}-${lIdx}`}
                              className="pl-6 pr-4 py-4 flex justify-between items-center text-base"
                            >
                              <div className="flex items-center gap-3">
                                <PlayCircle size={20} />
                                <span>{lesson.title || `Lesson ${lIdx + 1}`}</span>
                              </div>

                              {/* Show a lock if the course isn't published */}
                              {!course.published && <Lock size={18} />}
                            </AccordionContent>
                          ))}
                      </AccordionItem>
                    ))}
                </Accordion>
              )}
            </TabsContent>

            {/* Instructor */}
            <TabsContent value="instructor" className="mt-8">
              <div className="flex flex-col md:flex-row gap-8 md:items-start bg-indigo-50 p-8 rounded-lg items-center">
                <img
                  src={instructorInfo.profileImage}
                  alt={instructorInfo.name}
                  className="w-56 h-56 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-bold text-center md:text-start">
                    {instructorInfo.name}
                  </h3>
                  <p className="text-lg text-muted-foreground text-center md:text-start">
                    {instructorInfo.contact}
                  </p>

                  <div className="flex gap-10 text-lg text-gray-700 font-semibold pt-2">
                    <div className="flex items-center gap-3">
                      <FileText size={20} /> {instructorInfo.courses} Courses
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={20} /> {instructorInfo.students} Students
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4 md:justify-start md:items-start justify-center items-center">
                    {instructorInfo.socials.map(({ icon: Icon, url }, idx) => (
                      <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
                        <Icon className="w-6 h-6 text-gray-700 hover:text-indigo-800" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews" className="mt-8 space-y-8">
              <div className="flex flex-col sm:flex-row justify-between gap-8">
                <div className="flex flex-col items-center sm:items-start">
                  <h2 className="text-3xl font-bold text-gray-800">5.0</h2>
                  <div className="flex gap-2 mt-2 text-indigo-800">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={24} fill="currentColor" stroke="currentColor" />
                    ))}
                  </div>
                  <p className="text-base text-gray-500 mt-2">Total 1 Rating</p>
                </div>
                <div className="flex-1 space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3 text-base">
                      <span className="w-5">{star}</span>
                      <Star size={18} className="text-gray-400" />
                      <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                        <div
                          className={`h-full ${star === 5 ? "bg-indigo-800 w-[80%]" : "w-0"}`}
                        ></div>
                      </div>
                      <span className="ml-3 text-gray-500">
                        {star === 5 ? "1 Rating" : "0 Rating"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-indigo-50 p-6 rounded-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                >
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                      <div className="flex gap-2 text-indigo-800">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={20} fill="currentColor" stroke="currentColor" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-base text-gray-500 mt-1">
                      <Clock size={18} className="text-gray-400" />
                      <span>{review.timeAgo}</span>
                    </div>
                    <p className="mt-3 text-lg text-gray-700">{review.comment}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="p-4">
            <CardContent className="flex flex-col gap-4">
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={400}
                height={300}
                className="rounded-none"
              />
              <h3 className="text-3xl font-extrabold text-gray-800">
                {formatPrice(course.price)}
              </h3>

              <PaystackBuyButton courseId={course.id} />

              {Array.isArray(course.info) && course.info.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-xl font-semibold mb-2">Course Information</h4>
                  <ul className="text-lg text-muted-foreground list-disc pl-5 space-y-1">
                    {course.info.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full border font-bold border-smegear-secondary text-smegear-secondary"
          >
            Share This Course
          </Button>
        </div>
      </div>
    </div>
  );
}
