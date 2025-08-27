// lib/fetchAllCourses.ts
import { getCurrentSession } from "@/lib/getServerSession";
import axios from "axios";

export type Course = {
  id: string | number;
  title: string;
  imageUrl: string;
  price?: string | number | null;
  description?: string | null;

  // Optional fields to gracefully keep your existing UI
  students?: number | null;
  views?: number | null; // for "Views"
  category?: string | null; // for "Category"
  updatedAt?: string | null; // for "Last Updated"
  info?: string[]; // for right-column "Course Information"
};

export async function fetchAllCourses(): Promise<Course[]> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
      method: "GET",
      headers,
      next: { revalidate: 300 }, // ISR every 5 minutes
    });

    if (!res.ok) {
      console.error("Failed to fetch courses:", res.status, await res.text());
      return [];
    }

    const data = (await res.json()) as Course[] | { data: Course[] };
    const list = Array.isArray(data) ? data : data?.data ?? [];
    return list;
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
}

export const fetchAllCoursesBySession = async () => {
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
};

export const fetchAdminCourseBySlug = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${encodeURIComponent(
        slug
      )}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch course by slug:", e);
    return null;
  }
};
