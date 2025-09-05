"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, CheckCircle, Clock } from "lucide-react";

/** Course shapes coming from your API */
type APILesson = { id: string; /** optional if available */ duration?: number };
type APIModule = { lessons?: APILesson[] };
type APICourse = {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  modules?: APIModule[];
  progress?: number; // ignored; we recompute client-side
};

type CardVM = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  imageUrl: string;
  chapters: number;
  progress: number;
};

/** What /api/progress/user returns (we only need these fields) */
type ProgressRecord = {
  lessonId: string;
  completed: boolean;
};

/** Small hook: re-render whenever a Player updates localStorage in this tab or another tab */
function useLessonProgressPulse() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((t) => (t + 1) % 1_000_000);
    // Fired by Player in this tab
    window.addEventListener("lesson-progress", bump);
    // Fired when another tab writes to localStorage
    window.addEventListener("storage", bump);
    return () => {
      window.removeEventListener("lesson-progress", bump);
      window.removeEventListener("storage", bump);
    };
  }, []);
}

/** Fetch all user progress and return a set of completed lesson IDs */
function useCompletedLessonSet() {
  const [setCompleted, setSetCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/progress/user", {
          credentials: "include",
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch user progress");
        const data: ProgressRecord[] = await res.json();

        const s = new Set<string>();
        for (const p of data ?? []) {
          if (p.completed) s.add(String(p.lessonId));
        }
        if (!cancelled) setSetCompleted(s);
      } catch {
        if (!cancelled) setSetCompleted(new Set());
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // refresh on tab focus (in case server-side completion changed)
  useEffect(() => {
    const onShow = () => {
      if (document.visibilityState === "visible") {
        (async () => {
          try {
            const res = await fetch("/api/progress/user", {
              credentials: "include",
              headers: { Accept: "application/json" },
              cache: "no-store",
            });
            if (!res.ok) throw new Error();
            const data: ProgressRecord[] = await res.json();
            const s = new Set<string>(
              data.filter((d) => d.completed).map((d) => String(d.lessonId))
            );
            setSetCompleted(s);
          } catch {
            setSetCompleted(new Set());
          }
        })();
      }
    };
    document.addEventListener("visibilitychange", onShow);
    return () => document.removeEventListener("visibilitychange", onShow);
  }, []);

  return setCompleted;
}

const toCardModel = (
  mine: APICourse[],
  all: APICourse[],
  completedLessons: Set<string>
): CardVM[] => {
  const isBrowser = typeof window !== "undefined";
  const getSavedPct = (lessonId: string) =>
    isBrowser ? Number(localStorage.getItem(`pct:${lessonId}`) || 0) : 0;

  const idx = new Map(all.map((c) => [String(c.id), c]));

  return mine
    .map((mc) => {
      const id = String(mc.id || "");
      if (!id) return null;

      const full = idx.get(id) ?? mc;
      const lessons = (full.modules ?? []).flatMap((m) => m.lessons ?? []);
      const chapters = lessons.length;

      if (chapters === 0) {
        return {
          id,
          slug: full.slug,
          title: full.title || "Untitled Course",
          description: full.description || "",
          imageUrl: full.imageUrl || "/placeholder.png",
          progress: 0,
          chapters: 0,
        };
      }

      // A) Preferred: average of per-lesson pct saved by Player
      // (Each lesson contributes equally; optionally weight by duration if you store it.)
      let sumPct = 0;
      let count = 0;
      for (const l of lessons) {
        const pct = Math.max(0, Math.min(100, getSavedPct(String(l.id))));
        sumPct += pct;
        count += 1;
      }
      const pctByWatch = count > 0 ? Math.round(sumPct / count) : null;

      // B) Fallback: ratio of completed lessons from server
      const completedCount = lessons.reduce(
        (n, l) => n + (completedLessons.has(String(l.id)) ? 1 : 0),
        0
      );
      const pctByCompleted =
        chapters > 0 ? Math.round((completedCount / chapters) * 100) : 0;

      const progress = pctByWatch ?? pctByCompleted;

      return {
        id,
        slug: full.slug,
        title: full.title || "Untitled Course",
        description: full.description || "",
        imageUrl: full.imageUrl || "/placeholder.png",
        chapters,
        progress,
      };
    })
    .filter(Boolean) as CardVM[];
};

export default function CourseCards({
  allCourses,
  myCourses,
}: {
  allCourses: APICourse[];
  myCourses: APICourse[];
}) {
  const completedLessons = useCompletedLessonSet();

  // 👇 ensures CourseCards reacts instantly while the user watches lessons
  useLessonProgressPulse();

  const enrolled = useMemo(
    () => toCardModel(myCourses, allCourses, completedLessons),
    [myCourses, allCourses, completedLessons]
  );

  const inProgress = enrolled.filter(
    (c) => c.progress > 0 && c.progress < 100
  ).length;
  const completed = enrolled.filter((c) => c.progress === 100).length;

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold text-gray-800">Purchased Courses</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-4 shadow-sm">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">In Progress</p>
            <p className="text-xs text-muted-foreground">{inProgress} Courses</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-4 shadow-sm">
          <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">Completed</p>
            <p className="text-xs text-muted-foreground">{completed} Courses</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {enrolled.map((course) => (
          <Link key={course.id} href={`/purchasedCourses/${course.id}`}>
            <Card className="overflow-hidden shadow-lg rounded-xl bg-white pb-4 pt-0 hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
              <div className="overflow-hidden">
                <Image
                  src={course.imageUrl || "/placeholder.png"}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <CardContent className="px-6 space-y-4 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Book size={14} />
                    <span>{course.chapters} Chapters</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Progress value={course.progress} className="w-full h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {course.progress}% Complete
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
