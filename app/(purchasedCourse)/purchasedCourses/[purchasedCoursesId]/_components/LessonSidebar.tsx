"use client";

import { CheckCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export type Lesson = { id: string; title: string; duration?: string };
export type Module = { id: string; title: string; order: number; lessons: Lesson[] };

type Props = {
  courseTitle: string;
  modules: Module[];
};

export default function LessonSidebar({ courseTitle, modules }: Props) {
  const isCompleted = false
  const Icon = isCompleted ? CheckCircle : PlayCircle
  const pathname = usePathname();
  const sp = useSearchParams();
  const activeLessonId = sp.get("lessonId") || undefined;

  return (
    <div className="h-dvh flex flex-col">
      {/* <div className="px-4 py-3 border-b">
        <h2 className="font-semibold truncate">{courseTitle}</h2>
      </div> */}

      <nav className="flex-1 overflow-y-auto p-2 space-y-5">
        {modules
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((m) => (
            <div key={m.id}>
              <p className="px-2 text-xs uppercase tracking-wide text-gray-500">{m.title}</p>
              <ul className="mt-2">
                {m.lessons.map((lesson) => {
                  const href = `${pathname}?lessonId=${lesson.id}`;
                  const isActive = lesson.id === activeLessonId;
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={href}
                        className={`flex items-center justify-between px-3 py-2 rounded-md text-sm ${isActive ? "bg-smegear-secondary text-white" : "hover:bg-gray-100"
                          }`}
                      >
                        <span><Icon /></span>
                        <span className="truncate">{lesson.title}</span>
                        {lesson.duration ? (
                          <span
                            className={`ml-3 shrink-0 text-xs ${isActive ? "text-gray-200" : "text-gray-500"
                              }`}
                          >
                            {lesson.duration}
                          </span>
                        ) : null}
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
