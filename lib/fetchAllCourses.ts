// lib/fetchAllCourses.ts


export type Course = {
  id: string | number;
  title: string;
  imageUrl: string;
  price?: string | number | null;
  description?: string | null;

  // Optional fields to gracefully keep your existing UI
  students?: number | null;
  views?: number | null;         // for "Views"
  category?: string | null;      // for "Category"
  updatedAt?: string | null;     // for "Last Updated"
  info?: string[];               // for right-column "Course Information"
};

export async function fetchAllCourses(): Promise<Course[]> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
      {
        method: "GET",
        headers,
        next: { revalidate: 300 }, // ISR every 5 minutes
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch courses:", res.status, await res.text());
      return [];
    }

    const data = (await res.json()) as Course[] | { data: Course[] };
    const list = Array.isArray(data) ? data : (data?.data ?? []);
    return list;
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
}
