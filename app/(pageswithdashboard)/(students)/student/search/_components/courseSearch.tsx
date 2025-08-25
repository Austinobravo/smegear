"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchAllCourses } from "@/lib/fetchAllCourses";

type Course = {
  id: string | number;
  title: string;
  imageUrl: string;
  price?: string | number | null;
};




const formatPrice = (price?: string | number | null) => {
  if (price === null || price === undefined || price === "") return "Free";
  if (typeof price === "number") return new Intl.NumberFormat().format(price);
  return price;
};


const CourseCard = React.memo(function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/student/search/${course.id}`} className="no-underline">
      <Card className="overflow-hidden shadow-lg rounded-xl bg-white  p-0 group">
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
  );
});

export default function PopularCourses() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);


  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErrored(false);
      const list = await fetchAllCourses();
      if (!mounted) return;
      setCourses(list);
      setLoading(false);
      setErrored(list.length === 0);
    })();
    return () => {
      mounted = false;
    };
  }, []);


  useEffect(() => {
    const current = searchParams.get("q") ?? "";
    if (current !== query) {
      const p = new URLSearchParams(searchParams);
      if (query) p.set("q", query);
      else p.delete("q");
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    }

  }, [query]);

  const normalizedQ = query.trim().toLowerCase();

  const filteredCourses = useMemo(() => {
    if (!normalizedQ) return courses;
    return courses.filter((c) => c.title?.toLowerCase().includes(normalizedQ));
  }, [courses, normalizedQ]);

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl text-gray-800 font-bold">Search Courses</h2>
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title…"
            className="w-full sm:w-80"
            aria-label="Search courses"
          />
          {query ? (
            <Button variant="outline" onClick={() => setQuery("")}>
              Clear
            </Button>
          ) : null}
        </div>
      </div>


      {loading && (
        <div className="text-gray-500">Loading courses…</div>
      )}

      {!loading && errored && courses.length === 0 && (
        <div className="text-gray-500">
          No courses found right now. Please try again later.
        </div>
      )}

      {!loading && !errored && filteredCourses.length === 0 && (
        <div className="text-gray-500">
          No results for <span className="font-semibold">“{query}”</span>.
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
