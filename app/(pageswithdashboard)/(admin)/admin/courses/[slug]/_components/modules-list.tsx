'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import axios from 'axios'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Grip, Pencil, Trash2, Plus, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import ProductModal from './moduleModal'

type Lesson = { id: string; title: string }

type Module = {
  id: string
  title: string
  lessons: Lesson[]
}

interface ChaptersListProps {
  category?: {
    id: string
    title: string
    published: boolean
    modules: any[] // normalized below
  }
}

const addLessonSchema = z.object({
  title: z.string().min(1, 'Please enter a title').max(120, 'Keep it short'),
})

const ChaptersList: React.FC<ChaptersListProps> = ({ category }) => {
  const router = useRouter()
  if (!category) return null

  // Normalize modules once
  const [modules, setModules] = useState<Module[]>(
    () =>
      (category.modules ?? []).map((m: any) => ({
        id: String(m.id),
        title: m.title ?? m.ModuleTitle ?? m.name ?? '',
        lessons: Array.isArray(m.lessons)
          ? m.lessons.map((l: any) => ({ id: String(l.id), title: l.title ?? '' }))
          : [],
      })) as Module[]
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [addOpenFor, setAddOpenFor] = useState<string | null>(null)
  const [loadingLessonsFor, setLoadingLessonsFor] = useState<string | null>(null) // NEW: per-module loading state

  const addForm = useForm<z.infer<typeof addLessonSchema>>({
    resolver: zodResolver(addLessonSchema),
    defaultValues: { title: '' },
  })
  const { isSubmitting, isValid } = addForm.formState

  const selectedModule = selectedModuleId
    ? modules.find((m) => m.id === selectedModuleId)
    : undefined
  const numericModuleId =
    selectedModuleId != null && !Number.isNaN(Number(selectedModuleId))
      ? Number(selectedModuleId)
      : undefined

  const getToken = useCallback(async () => {
    const s = await getSession()
    const token = (s as any)?.accessToken
    if (!token) throw new Error('Missing access token')
    return token
  }, [])

  const onEditModule = (moduleId: string) => {
    setSelectedModuleId(moduleId)
    setModalOpen(true)
  }

  const onEditLesson = (lessonId: string) => {
    router.push(`/admin/courses/${category.id}/Lessons/${lessonId}`)
  }

  // Lazy-load lessons if module.lessons is empty
  const fetchLessonsByModuleId = useCallback(
    async (moduleId: string) => {
      setLoadingLessonsFor(moduleId)
      try {
        const token = await getToken()
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons`, {
          params: { moduleId },
          headers: { Authorization: `Bearer ${token}` },
        })
        const lessons = (res?.data?.lessons ?? res?.data ?? [])
          .map((l: any) => ({ id: String(l.id), title: l.title ?? '' })) as Lesson[]

        // Update even if empty, so we don't keep reloading on every open
        setModules((prev) => prev.map((m) => (m.id === moduleId ? { ...m, lessons } : m)))
      } catch {
        // Silent fail for UX; optionally toast here
      } finally {
        setLoadingLessonsFor(null)
      }
    },
    [getToken]
  )

  const handleAccordionOpen = async (value: string) => {
    // value format: `module-<id>`
    const id = value.replace('module-', '')
    const mod = modules.find((m) => m.id === id)
    if (mod && (!Array.isArray(mod.lessons) || mod.lessons.length === 0)) {
      await fetchLessonsByModuleId(id)
    }
  }

  const handleCreateLesson = addForm.handleSubmit(async ({ title }) => {
    if (!addOpenFor) return toast.error('No module selected.')
    const nextOrder = (modules.find((m) => m.id === addOpenFor)?.lessons?.length ?? 0) + 1
    const payload = { title, moduleId: addOpenFor, order: nextOrder }

    try {
      const token = await getToken()
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const newLessonId =
        res?.data?.id ?? res?.data?.lesson?.id ?? res?.data?.data?.id
      if (!newLessonId) throw new Error('Could not determine created lesson id')

      toast.success('Lesson created successfully!')
      setAddOpenFor(null)
      addForm.reset({ title: '' })
      router.push(`/admin/courses/${category.id}/Lessons/${newLessonId}`)
    } catch (e: any) {
      toast.error(e?.response?.data?.message || e?.message || 'Something went wrong')
    }
  })

  const onDeleteModule = async (moduleId: string) => {
    if (deletingId) return
    if (!window.confirm('Delete this module? This cannot be undone.')) return
    try {
      setDeletingId(moduleId)
      const token = await getToken()
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/modules`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: { id: moduleId },
      })
      setModules((prev) => prev.filter((m) => m.id !== moduleId))
      toast.success('Module deleted successfully')
      router.refresh();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || e?.message || 'Failed to delete module')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <ProductModal
        key={selectedModuleId ?? 'no-module'}
        open={modalOpen}
        onOpenChange={setModalOpen}
        moduleId={numericModuleId}
        initialTitle={selectedModule?.title ?? ''}
        onSave={async (values, ctx) => {
          const idStr =
            ctx?.moduleId != null
              ? String(ctx.moduleId)
              : selectedModuleId ?? undefined
          if (!idStr) return
          setModules((prev) =>
            prev.map((m) => (m.id === idStr ? { ...m, title: values.title } : m))
          )
        }}
      />

      <Accordion
        type="multiple"
        className="w-full"
        onValueChange={(vals) => {
          // When any item opens, fetch lessons for those with empty lessons
          const last = vals[vals.length - 1]
          if (last) handleAccordionOpen(last)
        }}
      >
        {modules.map((module) => {
          const isDeleting = deletingId === module.id
          const hasLessons = Array.isArray(module.lessons) && module.lessons.length > 0
          const isLoading = loadingLessonsFor === module.id

          return (
            <AccordionItem
              key={module.id}
              value={`module-${module.id}`}
              className={cn(
                'rounded-md border text-sm mb-4',
                category.published
                  ? 'bg-sky-100 border-sky-200 text-sky-700'
                  : 'bg-slate-200 border-slate-200 text-slate-700'
              )}
            >
              <div className="flex items-center gap-x-2 px-2 py-3">
                <div
                  className={cn(
                    'border-r px-2 pr-3 border-slate-200 rounded-l-md',
                    category.published && 'border-r-sky-200'
                  )}
                >
                  <Grip className="h-5 w-5" />
                </div>

                <span className="flex-1 text-black">{module.title}</span>

                <div className="flex items-center gap-x-2">
                  <Badge
                    className={cn(
                      'bg-slate-500',
                      category.published && 'bg-sky-700'
                    )}
                  >
                    {category.published ? 'Published' : 'Draft'}
                  </Badge>

                  <button
                    type="button"
                    onClick={() => onEditModule(module.id)}
                    className={cn(
                      'p-1 rounded hover:opacity-75',
                      isDeleting && 'pointer-events-none opacity-40'
                    )}
                    title="Edit module"
                    aria-label="Edit module"
                  >
                    <Pencil className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteModule(module.id)}
                    className={cn(
                      'p-1 rounded hover:opacity-75 flex items-center gap-1',
                      isDeleting && 'pointer-events-none opacity-40'
                    )}
                    title={isDeleting ? 'Deleting…' : 'Delete module'}
                    aria-label={isDeleting ? 'Deleting…' : 'Delete module'}
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                    ) : (
                      <Trash2 className="w-4 h-4 text-red-500" aria-hidden />
                    )}
                  </button>
                </div>

                <AccordionTrigger className="ml-2 px-2 py-1 rounded hover:bg-black/5 transition text-smegear-accent" />
              </div>

              <AccordionContent className="pl-12 pb-4">
                {isLoading && (
                  <p className="text-sm text-gray-500 italic mb-2">
                    Loading lessons...
                  </p>
                )}

                {!isLoading && hasLessons && (
                  <>
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between py-1"
                      >
                        <span className="text-sm">└─ {lesson.title}</span>
                        <div className="flex items-center gap-x-2">
                          <button
                            type="button"
                            onClick={() => onEditLesson(lesson.id)}
                            className="p-1 rounded hover:opacity-75"
                            title="Edit lesson"
                            aria-label="Edit lesson"
                          >
                            <Pencil className="w-4 h-4" aria-hidden />
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Always render the "Add Lesson" button */}
                {!isLoading && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-sky-700 hover:text-sky-900"
                    onClick={() => setAddOpenFor(module.id)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {hasLessons
                      ? `Add another lesson to ${module.title}`
                      : `Add Lesson to ${module.title}`}
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      {/* Create Lesson Dialog */}
      <Dialog
        open={Boolean(addOpenFor)}
        onOpenChange={(open) => {
          if (!open) {
            setAddOpenFor(null)
            addForm.reset({ title: '' })
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add lesson</DialogTitle>
          </DialogHeader>

          <Form {...addForm}>
            <form onSubmit={handleCreateLesson} className="space-y-3">
              <FormField
                control={addForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="input lesson title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setAddOpenFor(null)
                    addForm.reset({ title: '' })
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {isSubmitting ? 'Creating…' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ChaptersList
