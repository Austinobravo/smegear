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
import ProductModal from './moduleModal'

// ---- Types ----
type Lesson = { id: string; title: string }

type Module = {
  id: string // id as string so we can delete directly
  ModuleTitle: string
  lessons: Lesson[]
  name: string
}

interface ChaptersListProps {
  category?: {
    Title: string
    id: string
    OverView?: string
    modules: Module[]
    isPublished: boolean
    free: boolean
  }
}

const ChaptersList: React.FC<ChaptersListProps> = ({ category }) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEditing = () => setIsEditing((c) => !c)

  const [modules, setModules] = useState<Module[]>(() => category?.modules ?? [])

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)

  const [deletingId, setDeletingId] = useState<string | null>(null)

  if (!category) return null

  const onEditModule = (moduleId: string) => {
    setSelectedModuleId(moduleId)
    setModalOpen(true)
  }

  const onDeleteModule = async (moduleId: string) => {
    const ok = window.confirm('Delete this module? This cannot be undone.')
    if (!ok) return

    try {
      setDeletingId(moduleId)

      const res = await fetch('/api/modules', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: moduleId }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || `Request failed: ${res.status}`)
      }

      setModules((prev) => prev.filter((m) => m.id !== moduleId))
      toast.success('Module deleted')
      router.refresh()
    } catch (e: any) {
      toast.error(e?.message || 'Failed to delete module')
    } finally {
      setDeletingId(null)
    }
  }

  const onEditLesson = (lessonId: string) =>
    router.push(`/admin/courses/${category.id}/Lessons/${lessonId}`)
  const onDeleteLesson = (lessonId: string) => console.log('Delete lesson', lessonId)

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

  const selectedModule =
    selectedModuleId != null ? modules.find((m) => m.id === selectedModuleId) : undefined

  // --- FIX: Convert selectedModuleId to number ONLY if it's numeric ---
  const numericModuleId =
    selectedModuleId != null && !Number.isNaN(Number(selectedModuleId))
      ? Number(selectedModuleId)
      : undefined
  // --------------------------------------------------------------------

  return (
    <>
      <ProductModal
        key={selectedModuleId ?? 'no-module'}
        open={modalOpen}
        onOpenChange={setModalOpen}
        moduleId={numericModuleId}                // ✅ now number | undefined
        initialTitle={selectedModule?.ModuleTitle ?? ''}
        onSave={async (values, ctx) => {
          // ctx?.moduleId may be a number (from ProductModal), normalize to string for comparison
          const idStr =
            ctx?.moduleId != null ? String(ctx.moduleId) : selectedModuleId ?? undefined
          if (idStr == null) return

          setModules((prev) =>
            prev.map((m) => (m.id === idStr ? { ...m, ModuleTitle: values.title } : m))
          )
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
              const isDeletingThis = deletingId === module.id
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

                      {/* Edit button */}
                      <button
                        type="button"
                        onClick={() => onEditModule(module.id)}
                        className={cn(
                          'p-1 rounded hover:opacity-75',
                          isDeletingThis && 'pointer-events-none opacity-40'
                        )}
                        title="Edit module"
                        aria-label="Edit module"
                      >
                        <Pencil className="w-4 h-4" aria-hidden="true" />
                      </button>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => !isDeletingThis && onDeleteModule(module.id)}
                        className={cn(
                          'p-1 rounded hover:opacity-75',
                          isDeletingThis && 'pointer-events-none opacity-40'
                        )}
                        title={isDeletingThis ? 'Deleting…' : 'Delete module'}
                        aria-label={isDeletingThis ? 'Deleting…' : 'Delete module'}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" aria-hidden="true" />
                      </button>
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
                          <button
                            type="button"
                            onClick={() => onEditLesson(lesson.id)}
                            className="p-1 rounded hover:opacity-75"
                            title="Edit lesson"
                            aria-label="Edit lesson"
                          >
                            <Pencil className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteLesson(lesson.id)}
                            className="p-1 rounded hover:opacity-75"
                            title="Delete lesson"
                            aria-label="Delete lesson"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" aria-hidden="true" />
                          </button>
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
