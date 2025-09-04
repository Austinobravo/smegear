import { notFound, redirect } from "next/navigation";
import Player from "./_components/Player";
import LessonHeader from "./_components/LessonHeader";
import ResourceList from "./_components/ResourceList";
import type { Module } from "./_components/LessonSidebar";

// (You can share these helpers from a single file if you want)
async function getViewer() { return { id: "user_123" }; }
async function hasPurchasedCourse(userId: string, courseId: string) { return true; }

async function getCourse(courseId: string): Promise<{
  id: string;
  title: string;
  modules: (Module & { lessons: (Module["lessons"][number] & {
    // extra fields used by the player section
    videoUrl?: string;
    content?: string;
    resources?: { name: string; url: string }[];
  })[] })[];
} | null> {
  return {
    id: courseId,
    title: "Comprehensive Guide to NAFDAC and SON Registration in Nigeria",
    modules: [
      {
        id: "m1",
        title: "Module 1: Introduction to NAFDAC and SON",
        order: 1,
        lessons: [
          {
            id: "l1",
            title: "1.1 What is NAFDAC?",
            duration: "10:00",
            videoUrl:
              "https://res.cloudinary.com/degmow9p9/video/upload/v1756251758/vzun6ti13re07t1fq0ip.mp4",
            content:
              "<h1><strong>1.1 what is NAFDAC?</strong></h1><h3>…</h3>",
            resources: [{ name: "nafdac-notes.pdf", url: "/files/nafdac-notes.pdf" }],
          },
          {
            id: "l2",
            title: "1.2 What is SON?",
            duration: "07:12",
            videoUrl:
              "https://res.cloudinary.com/degmow9p9/video/upload/v1756251758/vzun6ti13re07t1fq0ip.mp4",
            content:
              "<h1><strong>1.2 What is SON?</strong></h1><h3>…</h3>",
            resources: [],
          },
        ],
      },
    ],
  };
}

type PageProps = {
  params: { purchasedCoursesId: string };
  searchParams: { lessonId?: string };
};

export default async function PurchasedCoursesPage({ params, searchParams }: PageProps) {
  const viewer = await getViewer();
  if (!viewer) redirect("/login");

  const purchased = await hasPurchasedCourse(viewer.id, params.purchasedCoursesId);
  if (!purchased) redirect(`/courses/${params.purchasedCoursesId}`);

  const course = await getCourse(params.purchasedCoursesId);
  if (!course) notFound();

  const modules = course.modules.slice().sort((a, b) => a.order - b.order);
  const flat = modules.flatMap((m) => m.lessons);

  if (flat.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">No lessons yet</h1>
        <p className="text-gray-600 mt-2">The instructor hasn’t added lessons to this course.</p>
      </div>
    );
  }

  const current = flat.find((l) => l.id === searchParams.lessonId) ?? flat[0];
  const idx = flat.findIndex((l) => l.id === current.id);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <section className="flex flex-col h-[calc(100vh-64px)] max-lg:px-3">
      <div className="p-4 pb-2">
        <Player src={(current as any).videoUrl} title={current.title} />
      </div>

      <div className="px-4">
        <LessonHeader
          title={current.title}
          duration={current.duration}
          prevHref={prev ? `?lessonId=${prev.id}` : undefined}
          nextHref={next ? `?lessonId=${next.id}` : undefined}
        />
      </div>

      <div className="px-4 pb-8 overflow-y-auto">
        {(current as any).content ? (
          <article
            className="prose max-w-none prose-h1:mb-2 prose-h3:mt-1"
            dangerouslySetInnerHTML={{ __html: (current as any).content }}
          />
        ) : null}
        <ResourceList resources={(current as any).resources ?? []} />
      </div>
    </section>
  );
}
