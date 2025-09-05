import axios from "axios";
import { getCurrentSession } from "@/lib/getServerSession";

type APILesson = {
  id: string;
  title: string;
  order?: number;
  duration?: string | number | null;
  content?: string | null;
  videoUrl?: string | null;
  video?: { url?: string | null } | null;
  resources?: { name: string; url: string }[];
};

type APIModule = {
  id: string;
  title: string;
  order: number;
  lessons?: APILesson[];
};

export type ULesson = {
  id: string;
  title: string;
  order: number;
  duration?: string;
  videoUrl?: string;
  content?: string;
  resources?: { name: string; url: string }[];
};

export type UModule = {
  id: string;
  title: string;
  order: number;
  lessons: ULesson[];
};

export type UCourse = {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  modules: UModule[];
};

const api = async (path: string, token?: string) =>
  (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  })).data;

const asArray = (x: any) => Array.isArray(x) ? x : (Array.isArray(x?.data) ? x.data : []);

export async function fetchCourses() {
    const session = await getCurrentSession() as any;
  const token = session?.accessToken;
  const userId = session?.user?.id; 
  const [allRaw, mineRaw] = await Promise.all([
    api("/api/courses", token),
    api("/api/my-courses", token)
  ]);
  const all = asArray(allRaw);
  const mine = asArray(mineRaw);
  return { token, all, mine,userId };
}

const normDuration = (d?: string | number | null) =>
  d == null || d === "" ? undefined : typeof d === "number" ? `${Math.floor(d / 60)
    .toString()
    .padStart(2, "0")}:${(d % 60).toString().padStart(2, "0")}` : d;

export function mapCourse(c: any): UCourse {
  const modules: UModule[] = asArray(c.modules).map((m: APIModule) => ({
    id: m.id,
    title: m.title,
    order: Number(m.order ?? 0),
    lessons: asArray(m.lessons).map((l: APILesson) => ({
      id: l.id,
      title: l.title,
      order: Number(l.order ?? 0),
      duration: normDuration(l.duration),
      videoUrl: l.videoUrl ?? l.video?.url ?? undefined,
      content: l.content ?? undefined,
      resources: Array.isArray(l.resources) ? l.resources : []
    }))
    .sort((a, b) => a.order - b.order)
  }))
  .sort((a, b) => a.order - b.order);

  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    imageUrl: c.imageUrl,
    modules
  };
}

export function findCourse(all: any[], purchasedCoursesId: string): any | null {
  return (
    all.find((c: any) => c.id === purchasedCoursesId) ||
    all.find((c: any) => c.slug === purchasedCoursesId) ||
    null
  );
}

export function userOwnsCourse(mine: any[], courseId: string) {
  const ids = mine.map((x: any) => x.id ?? x.courseId ?? x?.course?.id);
  return ids.includes(courseId);
}
