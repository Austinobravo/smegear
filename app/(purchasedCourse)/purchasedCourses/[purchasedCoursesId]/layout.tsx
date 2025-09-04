import PurchasedCourseNavbar from "./_components/PurchasedCourseNavbar";
import LessonSidebar, { Module } from "./_components/LessonSidebar";
import { redirect, notFound } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  params: { purchasedCoursesId: string };
};

// ---- Replace with your real auth/purchase logic ----
async function getViewer() {
  return { id: "user_123" };
}
async function hasPurchasedCourse(userId: string, courseId: string) {
  return true;
}

// ---- Replace with your real DB call ----
async function getCourse(courseId: string): Promise<{ id: string; title: string; modules: Module[] } | null> {
  return {
    id: courseId,
    title: "Comprehensive Guide to NAFDAC and SON Registration in Nigeria",
    modules: [
      {
        id: "m1",
        title: "Module 1: Introduction to NAFDAC and SON",
        order: 1,
        lessons: [
          { id: "l1", title: "1.1 What is NAFDAC?", duration: "10:00" },
          { id: "l2", title: "1.2 What is SON?", duration: "07:12" },
        ],
      },
    ],
  };
}

export default async function PurchasedCoursesLayout({ children, params }: LayoutProps) {
  const viewer = await getViewer();
  if (!viewer) redirect("/login");

  const purchased = await hasPurchasedCourse(viewer.id, params.purchasedCoursesId);
  if (!purchased) redirect(`/courses/${params.purchasedCoursesId}`);

  const course = await getCourse(params.purchasedCoursesId);
  if (!course) notFound();

  const orderedModules = course.modules.slice().sort((a, b) => a.order - b.order);

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
