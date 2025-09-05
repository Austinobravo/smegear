import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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

type CardVM = {
  id: string
  slug?: string
  title: string
  description: string
  imageUrl: string
  chapters: number
  progress: number
}

const toCardModel = (mine: APICourse[], all: APICourse[]): CardVM[] => {
  const idx = new Map(all.map(c => [String(c.id), c]))
  return mine.map(mc => {
    const id = String(mc.id || '')
    if (!id) return null
    const full = idx.get(id) ?? mc
    const chapters = (full.modules || []).reduce((n, m) => n + (m?.lessons?.length || 0), 0)
    return {
      id,
      slug: full.slug,
      title: full.title || 'Untitled Course',
      description: full.description || '',
      imageUrl: full.imageUrl || '/placeholder.png',
      chapters,
      progress: typeof mc.progress === 'number' ? mc.progress : (full.progress ?? 0)
    }
  }).filter(Boolean) as CardVM[]
}

export default function CourseCards({ allCourses, myCourses }: { allCourses: APICourse[]; myCourses: APICourse[] }) {
  const enrolled = toCardModel(myCourses, allCourses)
  const inProgress = enrolled.filter(c => c.progress > 0 && c.progress < 100).length
  const completed = enrolled.filter(c => c.progress === 100).length

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold text-gray-800">Purchased Courses</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-4 shadow-sm">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full"><Clock className="w-5 h-5" /></div>
          <div><p className="font-semibold text-sm">In Progress</p><p className="text-xs text-muted-foreground">{inProgress} Courses</p></div>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-4 shadow-sm">
          <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full"><CheckCircle className="w-5 h-5" /></div>
          <div><p className="font-semibold text-sm">Completed</p><p className="text-xs text-muted-foreground">{completed} Courses</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {enrolled.map(course => (
          <Link key={course.id} href={`/purchasedCourses/${course.id}`}>
            <Card className="overflow-hidden shadow-lg rounded-xl bg-white pb-4 pt-0 hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
              <div className="overflow-hidden">
                <Image
                  src={course.imageUrl || '/placeholder.png'}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <CardContent className="px-6 space-y-4 pb-6">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {course.title}
                </h3>

                {/* Description (kept from old card) */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>

                {/* Chapters + Price row */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Book size={14} />
                    <span>{course.chapters} Chapters</span>
                  </div>
                
                </div>

                {/* Progress (kept from old card) */}
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
  )
}
