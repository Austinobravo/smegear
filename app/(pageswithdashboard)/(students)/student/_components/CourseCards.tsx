// _components/CourseCards.tsx
import Link from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Book, CheckCircle, Clock } from 'lucide-react'

type APICourse = {
  id: string
  slug?: string
  title: string
  description?: string
  imageUrl?: string
  modules?: { lessons?: any[] }[]
  progress?: number
}

type CourseCardVM = {
  id: string
  slug?: string
  title: string
  description: string
  imageUrl: string
  chapters: number
  progress: number
}

/** Build a display model from possibly-partial “myCourses”, enriching from allCourses when needed. */
const toCardModel = (myCourses: APICourse[], allCourses: APICourse[]): CourseCardVM[] => {
  const index = new Map(allCourses.map((c) => [String(c.id), c]))

  return myCourses
    .map((mc) => {
      const id = String(mc.id ?? '')
      if (!id) return null

      const full = index.get(id) ?? mc

      const modules = Array.isArray(full?.modules) ? full.modules! : []
      const chapters = modules.reduce((sum, m) => sum + (Array.isArray(m?.lessons) ? m.lessons!.length : 0), 0)

      const title = full?.title || mc?.title || 'Untitled Course'
      const description = full?.description || ''
      const imageUrl = full?.imageUrl || '/placeholder.png'
      const progress =
        typeof mc?.progress === 'number'
          ? mc.progress!
          : typeof full?.progress === 'number'
          ? full.progress!
          : 0

      return { id, slug: full?.slug, title, description, imageUrl, chapters, progress }
    })
    .filter(Boolean) as CourseCardVM[]
}

export default function CourseCards({
  allCourses,
  myCourses
}: {
  allCourses: APICourse[]
  myCourses: APICourse[]
}) {
  const enrolled = toCardModel(myCourses, allCourses)
  const displayed = enrolled.slice(0, 3)

  const inProgress = enrolled.filter((c) => c.progress > 0 && c.progress < 100).length
  const completed = enrolled.filter((c) => c.progress === 100).length

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold text-gray-800">Purchased Courses</h2>

      {/* Summary */}
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

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map((course) => (
          <Link
            key={course.id}
            href={`/purchasedCourses/${course.slug ?? course.id}`}
          >
            <Card className="shadow-sm py-0 transition-transform duration-300 bg-white hover:scale-[1.02] hover:shadow-xl cursor-pointer">
              <CardHeader className="p-0">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  width={500}
                  height={300}
                  className="w-full h-32 object-cover rounded-t-md"
                />
              </CardHeader>

              <CardContent className="space-y-1 pt-4 px-4">
                <CardTitle className="text-xl font-semibold line-clamp-1">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm line-clamp-2">
                  {course.description}
                </CardDescription>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Book size={14} />
                  <span>{course.chapters} Chapters</span>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-1 px-4 pb-4">
                <Progress value={course.progress} className="w-full h-2" />
                <p className="text-xs text-muted-foreground">{course.progress}% Complete</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
