// page.tsx
import React from 'react'
import axios from 'axios'
import CourseCards from './_components/CourseCards'
import RecommendedCourses from './_components/RecommendedCourses'
import { getCurrentSession } from '@/lib/getServerSession'
import { Lesson } from '@/lib/generated/prisma'

type Module = {
  id: string;
  title: string;
  order?: number;
  courseId: string;
  lessons: Lesson[];
};

type APICourse = {
  id: string
  slug?: string
  title: string
  description?: string
  imageUrl?: string
  modules?: Module[]
  progress?: number
  price?: number
}

type EnrollmentLike = {
  courseId?: string
  progress?: number
  course?: APICourse
}

const api = async (path: string, token?: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`
  const res = await axios.get(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  })
  return res.data
}

const fetchData = async () => {
  try {
    const session = await getCurrentSession()
    const token = (session as any)?.accessToken

    const [allCoursesRaw, myCoursesRaw] = await Promise.all([
      api('/api/courses', token),
      api('/api/my-courses', token) // swagger: "courses only"
    ])
    console.log("allcourses", allCoursesRaw)
    console.log("my courses", myCoursesRaw)

    // Normalize “my courses” to an array of courses + (optional) progress
    // Supports either: [Course, ...]  OR  [{ courseId, progress, course? }, ...]
    const myCourses: (APICourse & { progress?: number })[] = Array.isArray(myCoursesRaw)
      ? myCoursesRaw.map((item: any) => {
        // 1) Already a full course
        if (item?.id && item?.title) return item as APICourse

        // 2) Enrollment-like
        const e = item as EnrollmentLike
        const course: APICourse | undefined =
          (e.course as APICourse) ||
          undefined

        if (course) return { ...course, progress: e.progress }
        // fallback when only courseId is present (will be enriched in the card mapper)
        return { id: String(e.courseId), title: '', progress: e.progress } as APICourse
      })
      : []

    const allCourses: APICourse[] = Array.isArray(allCoursesRaw) ? allCoursesRaw : []

    return { allCourses, myCourses }
  } catch (err) {
    console.error('fetch error', err)
    return { allCourses: [], myCourses: [] }
  }
}

const Page = async () => {
  const { allCourses, myCourses } = await fetchData()
  console.log(myCourses)
  return (
    <section className="space-y-6">
      <CourseCards allCourses={allCourses} myCourses={myCourses} />
      <RecommendedCourses data={allCourses} />
    </section>
  )
}

export default Page
