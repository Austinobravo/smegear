import axios from 'axios'
import CourseCards from './_components/CourseCards'
import RecommendedCourses from './_components/RecommendedCourses'
import { getCurrentSession } from '@/lib/getServerSession'

type APICourse = {
  id: string
  slug?: string
  title: string
  description?: string
  imageUrl?: string
  modules?: { lessons?: any[] }[]
  progress?: number
}

const api = async (path: string, token?: string) =>
  (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  })).data

const asArray = (x: any) => Array.isArray(x) ? x : (Array.isArray(x?.data) ? x.data : [])

const fetchData = async () => {
  try {
    const token = (await getCurrentSession() as any)?.accessToken
    const [allRaw, mineRaw] = await Promise.all([
      api('/api/courses', token),
      api('/api/my-courses', token)
    ])

    const allCourses: APICourse[] = asArray(allRaw)
    const myInput = asArray(mineRaw)

    // normalize: accept either full courses or enrollment-like { course, progress } or { courseId, progress }
    const myCourses: APICourse[] = myInput.map((it: any) => {
      if (it?.id && it?.title) return it
      if (it?.course) return { ...it.course, progress: it.progress }
      return { id: String(it?.courseId ?? ''), title: '', progress: it?.progress }
    })

    return { allCourses, myCourses }
  } catch {
    return { allCourses: [], myCourses: [] }
  }
}

const Page = async () => {
  const { allCourses, myCourses } = await fetchData()
  console.log("allCourses", allCourses, "myCourses", myCourses)
  return (
    <section className="space-y-6">
      <CourseCards allCourses={allCourses} myCourses={myCourses} />
      <RecommendedCourses data={allCourses} />
    </section>
  )
}

export default Page
