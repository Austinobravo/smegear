'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Grip, Pencil, Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// NOTE: rename to your real path
import ProductModal, { ProductFormValues } from './moduleModal'

// ---- Types ----
type Lesson = { id: string; title: string }

type Module = {
  id: number
  ModuleTitle: string
  lessons: Lesson[]
  name: string
}

interface ChaptersListProps {
  category?: {
    Title: string
    id: number
    OverView?: string
    Modules: Module[]
    isPublished: boolean
    free: boolean
  }
}

const ChaptersList: React.FC<ChaptersListProps> = ({ category }) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEditing = () => setIsEditing((c) => !c)

  // keep a local copy so we can update the UI immediately
  const [modules, setModules] = useState<Module[]>(() => category?.Modules ?? [])

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null)

  if (!category) return null

  const onEditModule = (moduleId: number) => {
    setSelectedModuleId(moduleId)
    setModalOpen(true)
  }

  const onEditLesson = (lessonId: string) => router.push(`/admin/courses/${category.id}/Lessons/${lessonId}`)
  const onDeleteLesson = (lessonId: string) => console.log('Delete lesson', lessonId)

  // Legacy inline form (unchanged)
  const formSchema = z.object({ title: z.string().min(1) })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '' },
  })
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    toast.success('Chapter Created')
    toggleEditing()
  }

  // derive the currently selected module
  const selectedModule = selectedModuleId != null ? modules.find((m) => m.id === selectedModuleId) : undefined

  return (
    <>
      <ProductModal
        key={selectedModuleId ?? 'no-module'} // force re-mount when switching ids
        open={modalOpen}
        onOpenChange={setModalOpen}
        moduleId={selectedModuleId ?? undefined}
        initialTitle={selectedModule?.ModuleTitle ?? ''}
        onSave={async (values, ctx) => {
          // ctx.moduleId is provided by the modal; fall back to local state if needed
          const id = ctx?.moduleId ?? selectedModuleId
          if (id == null) return

          // TODO: wire up to your API
          // await axios.patch(`/api/categories/${category.id}/modules/${id}`, { title: values.title })

          // optimistic UI update
          setModules((prev) =>
            prev.map((m) => (m.id === id ? { ...m, ModuleTitle: values.title } : m))
          )

          toast.success('Module updated', { description: `Module #${id} saved.` })
        }}
      />

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g Introduction to the course"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isEditing && (
        <div>
          <Accordion type="multiple" className="w-full">
            {modules.map((module) => {
              const courseIsPublished = category.isPublished
              const courseIsFree = category.free
              return (
                <AccordionItem
                  key={module.id}
                  value={`module-${module.id}`}
                  className={cn(
                    'rounded-md border text-sm mb-4',
                    courseIsPublished
                      ? 'bg-sky-100 border-sky-200 text-sky-700'
                      : 'bg-slate-200 border-slate-200 text-slate-700'
                  )}
                >
                  <div className="flex items-center gap-x-2 px-2 py-3">
                    <div
                      className={cn(
                        'border-r px-2 pr-3 border-slate-200 rounded-l-md',
                        courseIsPublished && 'border-r-sky-200'
                      )}
                    >
                      <Grip className="h-5 w-5" />
                    </div>

                    <span className="flex-1">{module.ModuleTitle}</span>

                    <div className="flex items-center gap-x-2">
                      {courseIsFree && <Badge>Free</Badge>}
                      <Badge className={cn('bg-slate-500', courseIsPublished && 'bg-sky-700')}>
                        {courseIsPublished ? 'Published' : 'Draft'}
                      </Badge>

                      <Pencil
                        onClick={() => onEditModule(module.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75"
                      />
                    </div>

                    <AccordionTrigger className="ml-2 px-2 py-1 rounded hover:bg-black/5 transition text-smegear-accent" />
                  </div>

                  <AccordionContent className="pl-12 pb-4">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm">└─ {lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <Pencil
                            onClick={() => onEditLesson(lesson.id)}
                            className="w-4 h-4 cursor-pointer hover:opacity-75"
                          />
                          <Trash2
                            onClick={() => onDeleteLesson(lesson.id)}
                            className="w-4 h-4 cursor-pointer hover:opacity-75 text-red-500"
                          />
                        </div>
                      </div>
                    ))}

                    <Button variant="ghost" size="sm" className="mt-2 text-sky-700 hover:text-sky-900">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Lesson to {module.name}
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      )}
    </>
  )
}

export default ChaptersList
