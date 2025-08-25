// app/(pageswithdashboard)/(admin)/admin/courses/[slug]/page.tsx
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import { fetchAllCoursesBySession } from "@/lib/fetchAllCourses";
import { notFound } from "next/navigation";
import ModulesForm from "./_components/modules-form";
import Banner from "@/components/banner";
import CourseActions from "./_components/course-actions";
type PageProps = { params: { slug: string } };

async function fetchAdminCourseBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch course by slug:", e);
    return null;
  }
}

export default async function AdminCoursesPage({ params }: PageProps) {
  const data = await fetchAllCoursesBySession()
  console.log("fetchAllCoursesBySession", data)

  const { slug } = params;
  const course = await fetchAdminCourseBySlug(slug);

  console.log("Fetched course with id:", course);

  if (!course) return notFound();

  const requiredFields = [course.title, course.description, course.imageUrl, course.price];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = ` (${completedFields}/${totalFields})`;
  const isComplete=requiredFields.every(Boolean);
  return (
    <>
      {!course.published && (<Banner variant="warning" label='This course is unpublished. It will not be visible in the course list' />)}
      <div className="p-6">
        {/* Show the specific course title based on its slug */}
        <h1 className="text-2xl font-semibold">Course setup</h1>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col gap-y-2">
            <span className="text-muted-foreground">Complete all fields {completionText}</span>
          </div>
          <CourseActions disabled={!isComplete} courseId={course.id} published={course.published} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>

            {/* Keep your existing prop names; change if your components expect `course` or `initialData` */}
            <TitleForm category={course} />
            <DescriptionForm category={course} />
            <ImageForm courseId={course.id} initialImg={course.imageUrl} />
            <CategoryForm />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course modules</h2>
              </div>
              <ModulesForm category={course} />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm courseId={course.id} initialPrice={course.price} />

            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resource & Attachments</h2>
              </div>
              <AttachmentForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
