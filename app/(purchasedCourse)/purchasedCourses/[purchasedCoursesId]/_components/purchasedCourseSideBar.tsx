"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Lesson = { id: string; title: string; duration?: string };
type Module = { id: string; title: string; order: number; lessons: Lesson[] };

export function LessonSidebar({
  courseTitle,
  modules,
  activeLessonId,
}: {
  courseTitle: string;
  modules: Module[];
  activeLessonId?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="h-dvh flex flex-col">
      

      <nav className="flex-1 overflow-y-auto p-2 space-y-5">
        {modules
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
                        className={`flex items-center justify-between px-3 py-2 rounded-md text-sm
                          ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                      >
                        <span className="truncate">{lesson.title}</span>
                        {lesson.duration ? (
                          <span
                            className={`ml-3 shrink-0 text-xs ${
                              isActive ? "text-gray-200" : "text-gray-500"
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
