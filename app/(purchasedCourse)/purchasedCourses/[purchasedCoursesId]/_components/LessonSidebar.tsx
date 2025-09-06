"use client";

import { CheckCircle, PlayCircle, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export type Lesson = { id: string; title: string; duration?: string };
export type Module = { id: string; title: string; order: number; lessons: Lesson[] };

type Props = {
  courseTitle: string;
  modules: Module[];
  onNavigate?: () => void; // ✅ new prop
};

export default function LessonSidebar({ courseTitle, modules, onNavigate }: Props) {
  const isCompleted = false;
  const Icon = isCompleted ? CheckCircle : PlayCircle;
  const pathname = usePathname();
  const sp = useSearchParams();

  const activeLessonId = sp.get("lessonId") || undefined;
  const activeModuleId = sp.get("moduleId") || undefined;
  const showOverview = !activeLessonId && !activeModuleId;

  return (
    <div className="h-dvh flex flex-col">
      <nav className="flex-1 overflow-y-auto p-2 space-y-5">
        {/* ---- Course Overview Tab ---- */}
        <div>
          <Link
            href={pathname}
            onClick={onNavigate} // ✅ closes sheet
            className={`flex items-center gap-2 px-3 py-4 rounded-md text-sm font-semibold ${
              showOverview
                ? "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                : "hover:bg-gray-100"
            }`}
          >
            <BookOpen />
            <span>Course Overview</span>
          </Link>
        </div>

        {/* ---- Modules & Lessons ---- */}
        {modules
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((m) => (
            <div key={m.id}>
              <p className="px-2 text-sm uppercase tracking-wide text-gray-500 mt-4">
                {m.title}
              </p>
              <ul className="mt-2">
                {m.lessons.map((lesson) => {
                  const href = `${pathname}?lessonId=${lesson.id}`;
                  const isActive = lesson.id === activeLessonId;
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={href}
                        onClick={onNavigate} // ✅ closes sheet
                        className={`flex items-center gap-2 px-3 py-4 rounded-md text-sm font-semibold ${
                          isActive
                            ? "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <span>
                          <Icon />
                        </span>
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </nav>
    </div>
  );
}
