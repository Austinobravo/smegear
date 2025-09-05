import { notFound, redirect } from "next/navigation";
import {
  fetchCourses,
  findCourse,
  mapCourse,
  userOwnsCourse,
} from "@/lib/course-api";
import Player from "./_components/Player";
import LessonHeader from "./_components/LessonHeader";
import ResourceList from "./_components/ResourceList";
import VisibilityRefresh from "./_components/VisibilityRefresh"; // ⬅️ wrapper

type PageProps = {
  params: { purchasedCoursesId: string };
  searchParams: { lessonId?: string; moduleId?: string };
};

export default async function PurchasedCoursesPage({
  params,
  searchParams,
}: PageProps) {
  const { all, mine, userId } = await fetchCourses();

  const raw = findCourse(all, params.purchasedCoursesId);
  if (!raw) notFound();

  if (!userOwnsCourse(mine, raw.id)) {
    redirect(`/courses/${raw.slug ?? raw.id}`);
  }

  const course = mapCourse(raw);
  const modules = course.modules ?? [];
  const lessons = modules.flatMap((m) => m.lessons ?? []);

  // ✅ Default: Show Course Overview
  if (!searchParams.lessonId && !searchParams.moduleId) {
    return (
      <VisibilityRefresh>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
          {course.description ? (
            <h3 className="text-lg text-gray-600">{course.description}</h3>
          ) : (
            <h3 className="text-lg text-gray-400 italic">
              No description provided.
            </h3>
          )}
        </div>
      </VisibilityRefresh>
    );
  }

  if (lessons.length === 0) {
    return (
      <VisibilityRefresh>
        <div className="p-8">
          <h1 className="text-xl font-semibold">No lessons yet</h1>
          <p className="text-gray-600 mt-2">
            The instructor hasn’t added lessons to this course.
          </p>
        </div>
      </VisibilityRefresh>
    );
  }

  const current =
    lessons.find((l) => String(l.id) === String(searchParams.lessonId)) ??
    lessons[0];

  const idx = lessons.findIndex((l) => String(l.id) === String(current.id));
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const currentLessonId = String(current.id);
  const lessonTitle = current.title || "Untitled Lesson";
  const videoUrl = current.videoUrl || "";
  const prevLessonId = prev ? String(prev.id) : undefined;

  return (
    <VisibilityRefresh>
      <section className="flex flex-col max-lg:px-3">
        <div className="p-4 pb-2">
          {videoUrl ? (
            <Player
              src={videoUrl}
              title={lessonTitle}
              lessonId={currentLessonId}
              previousLessonId={prevLessonId}
              userId={userId}
            />
          ) : (
            <div className="rounded-md border p-4 text-sm text-gray-600 bg-gray-50">
              This lesson has no video attached.
            </div>
          )}
        </div>

        <div className="px-4">
          <LessonHeader
            title={current.title}
            duration={current.duration}
            prevHref={prev ? `?lessonId=${prev.id}` : undefined}
            nextHref={next ? `?lessonId=${next.id}` : undefined}
          />
        </div>

        <div className="px-4 pb-8">
          {current.content ? (
            <article
              className="prose max-w-none prose-h1:mb-2 prose-h3:mt-1"
              dangerouslySetInnerHTML={{ __html: current.content }}
            />
          ) : null}
          <ResourceList resources={current.resources ?? []} />
        </div>
      </section>
    </VisibilityRefresh>
  );
}
