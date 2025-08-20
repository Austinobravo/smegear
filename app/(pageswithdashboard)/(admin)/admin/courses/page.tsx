// app/(pageswithdashboard)/(admin)/admin/courses/page.tsx
import React from "react";
import axios from "axios";
import { getCurrentSession } from '@/lib/getServerSession' // adjust import to your session util
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

async function fetchAllCourses() {
  try {
    const session = await getCurrentSession();
    const token = (session as any).accessToken;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("all courses", response.data);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}

const CoursesPage = async () => {
  const courses = await fetchAllCourses(); // ✅ fetch server-side

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Courses</h1>

      <DataTable columns={columns} data={courses} /> {/* ✅ pass API data */}
    </div>
  );
};

export default CoursesPage;
