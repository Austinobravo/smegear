"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {  ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Course = {
  id: string | number;
  title: string;
  imageUrl: string;
  price?: string | number | null;
  // Optional fields if your API has them (used for badges/metadata)
  lessons?: number | string;
  students?: number | string;
  level?: string;
  duration?: string;
  oldPrice?: string | number | null;
  // For date sorting if your API includes it (e.g., ISO string)
  date?: string;
  createdAt?: string;
  updatedAt?: string;
};

const CURRENCY = "USD"; // change if needed

export default function FilterCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sort, setSort] = useState(
    "Course Title (a-z)" as
    | "Release Date (newest first)"
    | "Release Date (oldest first)"
    | "Course Title (a-z)"
    | "Course Title (z-a)"
    | "Price (low to high)"
    | "Price (high to low)"
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const perPage = 6;

  // Fetch courses from your API
  useEffect(() => {
    const ac = new AbortController();

    async function fetchAllCourses(): Promise<Course[]> {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // `next` hints are ignored on the client; left here harmlessly.
            next: { revalidate: 300 },
            signal: ac.signal,
          }
        );

        if (!res.ok) {
          const text = await res.text();
          console.error("Failed to fetch courses:", res.status, text);
          return [];
        }

        const data = (await res.json()) as Course[] | { data: Course[] };
        const list = Array.isArray(data) ? data : data?.data ?? [];
        return Array.isArray(list) ? list : [];
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("Error fetching courses:", err);
        }
        return [];
      }
    }

    (async () => {
      setLoading(true);
      setError(null);
      const list = await fetchAllCourses();
      if (!list.length) {
        setError("No courses found.");
      }
      setCourses(list);
      setLoading(false);
    })();

    return () => ac.abort();
  }, []);

  // Helpers
  const priceToNumber = (p: Course["price"]) => {
    if (p == null || p === "") return NaN;
    if (typeof p === "number") return p;
    // attempt to parse e.g. "$129.99", "₦10,000", "129,99"
    const cleaned = p.toString().replace(/[^\d.,-]/g, "").replace(/,/g, "");
    const num = Number(cleaned);
    return isNaN(num) ? NaN : num;
  };

  const fmtPrice = (p: Course["price"]) => {
    if (p == null || p === "" || (typeof p !== "number" && isNaN(priceToNumber(p))))
      return "Free";
    const value = typeof p === "number" ? p : priceToNumber(p);
    if (isNaN(value)) return String(p);
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: CURRENCY,
        maximumFractionDigits: 2,
      }).format(value);
    } catch {
      return `$${value}`;
    }
  };

  const getDate = (c: Course) => {
    const d = c.date ?? c.updatedAt ?? c.createdAt;
    return d ? new Date(d) : null;
  };

  // Sorting
  const sortedCourses = useMemo(() => {
    const sorted = [...courses];
    switch (sort) {
      case "Release Date (newest first)":
        sorted.sort((a, b) => {
          const da = getDate(a)?.getTime() ?? 0;
          const db = getDate(b)?.getTime() ?? 0;
          return db - da;
        });
        break;
      case "Release Date (oldest first)":
        sorted.sort((a, b) => {
          const da = getDate(a)?.getTime() ?? 0;
          const db = getDate(b)?.getTime() ?? 0;
          return da - db;
        });
        break;
      case "Course Title (a-z)":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Course Title (z-a)":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Price (low to high)":
        sorted.sort((a, b) => {
          const pa = priceToNumber(a.price);
          const pb = priceToNumber(b.price);
          // Free/NaN goes last
          if (isNaN(pa) && isNaN(pb)) return 0;
          if (isNaN(pa)) return 1;
          if (isNaN(pb)) return -1;
          return pa - pb;
        });
        break;
      case "Price (high to low)":
        sorted.sort((a, b) => {
          const pa = priceToNumber(a.price);
          const pb = priceToNumber(b.price);
          if (isNaN(pa) && isNaN(pb)) return 0;
          if (isNaN(pa)) return 1;
          if (isNaN(pb)) return -1;
          return pb - pa;
        });
        break;
      default:
        break;
    }
    return sorted;
  }, [courses, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedCourses.length / perPage));
  const paginatedCourses = useMemo(() => {
    const start = (page - 1) * perPage;
    return sortedCourses.slice(start, start + perPage);
  }, [page, sortedCourses]);

  // Ensure current page is valid when data/filters change
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8 mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-300 py-6 px-8 rounded-lg gap-4">
        <div className="text-xl font-semibold text-gray-900">
          <h4 className="font-bold text-2xl">
            {loading ? "…" : sortedCourses.length}{" "}
            <span className="text-gray-600 text-lg">courses</span>
          </h4>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="border flex items-center gap-2 rounded px-6 py-4 bg-white text-[16px]">
            <span>{sort}</span>
            <ChevronDown size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            {[
              "Release Date (newest first)",
              "Release Date (oldest first)",
              "Course Title (a-z)",
              "Course Title (z-a)",
              "Price (low to high)",
              "Price (high to low)",
            ].map((option) => (
              <DropdownMenuItem
                key={option}
                onSelect={() =>
                  setSort(option as typeof sort)
                }
                className="hover:bg-gray-300"
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {error && !loading && (
        <div className="text-center text-red-600">{error}</div>
      )}

      {loading ? (
        // Simple skeletons
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: perPage }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-80 bg-gray-200 rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.map((course) => {
            const href = `/courses/${course.id}`;
            const img = course.imageUrl || "/placeholder-course.jpg";
            return (
              <Link key={course.id} href={href} className="no-underline">
                <Card className="overflow-hidden shadow-lg rounded-xl bg-white p-0">
                  <div className="overflow-hidden">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      width={600}
                      height={400}
                      className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="px-6 space-y-4 pb-6">
                    <h3 className=" cursor-pointer text-lg font-semibold text-gray-900 line-clamp-2">
                      {course.title}
                    </h3>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-base font-semibold text-primary">
                        Smegear
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary text-smegear-accent">
                          ₦ {course.price ?? "—"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && sortedCourses.length > 0 && (
        <div className="flex justify-center items-center gap-2 my-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
            aria-label="Previous page"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => handlePageChange(n)}
              className={`px-3 py-1 border rounded ${n === page ? "bg-gray-200 font-bold" : ""
                }`}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Page ${n}`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
