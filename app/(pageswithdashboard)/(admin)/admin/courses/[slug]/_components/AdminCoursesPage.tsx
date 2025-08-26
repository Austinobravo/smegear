// page.tsx
import { notFound } from "next/navigation";
import { fetchAdminCourseBySlug } from "@/lib/fetchAllCourses";
import AdminCoursesClient from "../page";

export default async function AdminCoursesPage({ params }: { params: { slug: string } }) {
  const course = await fetchAdminCourseBySlug(params.slug);
  if (!course) return notFound();
  return <AdminCoursesClient initialCourse={course} />;
}
