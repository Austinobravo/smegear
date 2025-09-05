import { redirect, notFound } from "next/navigation";
import PurchasedCourseNavbar from "./_components/PurchasedCourseNavbar";
import LessonSidebar from "./_components/LessonSidebar";
import { fetchCourses, findCourse, mapCourse, userOwnsCourse } from "@/lib/course-api";

type LayoutProps = {
  children: React.ReactNode;
  params: { purchasedCoursesId: string };
};

export default async function PurchasedCoursesLayout({ children, params }: LayoutProps) {
  const { all, mine } = await fetchCourses();
  const raw = findCourse(all, params.purchasedCoursesId);
  if (!raw) notFound();

  const owns = userOwnsCourse(mine, raw.id);
  if (!owns) redirect(`/courses/${raw.slug ?? raw.id}`);

  const course = mapCourse(raw);
  const orderedModules = course.modules;

  return (
  <div className="min-h-screen grid grid-cols-[300px_1fr] max-lg:grid-cols-1 bg-white">
      {/* Top navbar */}
      <div className="fixed top-0 inset-x-0 z-50 h-[64px]">
        <PurchasedCourseNavbar courseTitle={course.title} modules={orderedModules} />
      </div>

      {/* Desktop sidebar */}
      <aside className="border-r max-lg:hidden pt-[64px]">
        <LessonSidebar courseTitle={course.title} modules={orderedModules} />
      </aside>

      {/* Main content */}
      <main className="pt-[64px] max-lg:col-span-2">{children}</main>
    </div>
  );
}
