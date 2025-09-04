// app/(pageswithdashboard)/(admin)/admin/courses/[slug]/_components/admin-course-client.tsx
"use client";

import { useMemo, useOptimistic } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import TitleForm from "./title-form";
import DescriptionForm from "./description-form";
import ImageForm from "./image-form";
import CategoryForm from "./category-form";
import PriceForm from "./price-form";
import AttachmentForm from "./attachment-form";
import ModulesForm from "./modules-form";
import Banner from "@/components/banner";
import CourseActions from "./course-actions";
import { BackButton } from "@/components/globals/BackButton";

// Shape this to your course type
type Course = {
  id: string;
  slug: string;
  title: string ;
  description?: string;
  imageUrl?: string | null;
  price?: number | null;
   modules?: {
      courseId: string
      id: string;
      title: string;
      name: string;
      lessons: { id: string; title: string }[];
      order: number;
    }[];
  published: boolean;
};

export default function AdminCourseClient({ initialCourse }: { initialCourse: Course }) {
  const router = useRouter();
  const pathname = usePathname();

  // Keep a local optimistic copy of the course
  const [course, updateCourseOptimistic] = useOptimistic<Course, Partial<Course>>(
    initialCourse,
    (state, patch) => ({
      ...state,
      ...patch,
      // if modules come in as a number or array patch, normalize here if needed
      modules: patch.modules ?? state.modules,
    })
  );

  // Calculate completion on the client (updates instantly)
  const { completionText, isComplete, completedFields, totalFields } = useMemo(() => {
    const requiredFlags = [
      Boolean(course.title),
      Boolean(course.description),
      Boolean(course.imageUrl),
      Boolean(course.price),
      (course.modules?.length ?? 0) > 0,
    ];
    const total = requiredFlags.length;
    const completed = requiredFlags.filter(Boolean).length;
    return {
      completionText: ` (${completed}/${total})`,
      isComplete: requiredFlags.every(Boolean),
      completedFields: completed,
      totalFields: total,
    };
  }, [course]);

  /**
   * Call this after a successful server mutation in any child form.
   *  - Immediately apply a local optimistic patch
   *  - Then re-read the server by replacing the current pathname
   */
  const onUpdated = (patch: Partial<Course>) => {
    // 1) optimistic patch for snappy UI
    updateCourseOptimistic(patch);
    // 2) re-run the route to get fresh server data
    router.replace(pathname);
  };

  return (
    <>
      {!course.published && (
        <Banner
          variant="warning"
          label="This course is unpublished. It will not be visible in the course list"
        />
      )}

      <div className="p-6">
        <BackButton />

        <h1 className="text-2xl font-semibold mt-4">Course setup</h1>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col gap-y-2">
            <span className="text-muted-foreground">
              Complete all fields {completionText}
            </span>
          </div>

          <CourseActions disabled={!isComplete} courseId={course.id} published={course.published} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>

            {/* Pass onUpdated so each form can inform us when it changes data */}
            <TitleForm category={course} />
            <DescriptionForm category={course}  />
            <ImageForm courseId={course.id} initialImg={course.imageUrl}  />
            <CategoryForm />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course modules</h2>
              </div>
              <ModulesForm category={course}  />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm courseId={course.id} initialPrice={course.price}  />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resource & Attachments</h2>
              </div>
              <AttachmentForm  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
