import PurchasedCourseNavbar from "./_components/PurchasedCourseNavbar";
import LessonSidebar, { Module } from "./_components/LessonSidebar";
import { redirect, notFound } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: number }>;
}) => {
  const id = (await params).id
  const category = courses.find((cat) => cat.id === id);
  if(!category) return notFound()

  // Safely log the title (avoids crash if category is undefined)
  console.log("Course Title:", category?.title ?? "Not found");

  return (
    <div className="h-screen grid grid-cols-[300px_1fr] max-lg:grid-cols-1 bg-white">
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
