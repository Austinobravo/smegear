"use client";

import useSWR from "swr";
import { useMemo } from "react";
import Banner from "@/components/banner";
import CourseActions from "./course-actions";

type Props = {
  slug: string;
  initialCourse: any; // ideally: your Course type
};

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch");
    return r.json();
  });

export default function CourseCompletion({ slug, initialCourse }: Props) {
  const key = `/api/courses/${encodeURIComponent(slug)}`;

  const { data: course } = useSWR(key, fetcher, {
    fallbackData: initialCourse,
    revalidateOnFocus: true,
    keepPreviousData: true,
    refreshInterval: 0, // no polling; changes will come from optimistic mutate()
  });

  const { isComplete, completionText } = useMemo(() => {
    if (!course) return { isComplete: false, completionText: "" };
    const required = [course.title, course.description, course.imageUrl, course.price];
    const total = required.length;
    const done = required.filter(Boolean).length;
    return {
      isComplete: done === total,
      completionText: ` (${done}/${total})`,
    };
  }, [course]);

  return (
    <>
      {!course?.published && (
        <Banner
          variant="warning"
          label="This course is unpublished. It will not be visible in the course list"
        />
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col gap-y-2">
          <span className="text-muted-foreground">
            Complete all fields{completionText}
          </span>
        </div>
        <CourseActions
          disabled={!isComplete}
          courseId={course?.id}
          published={course?.published}
        />
      </div>
    </>
  );
}
