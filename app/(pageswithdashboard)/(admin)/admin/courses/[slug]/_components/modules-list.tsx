'use client'

import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, useSession } from 'next-auth/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Grip, Pencil, Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

// NOTE: rename to your real path
import ProductModal from './moduleModal'
import axios from 'axios'

/* ===================== Types ===================== */
type Lesson = { id: string; title: string }

type Module = {
  id: string
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

/* ===================== Schemas ===================== */
const addLessonSchema = z.object({
  title: z.string().min(1, 'Please enter a title').max(120, 'Keep it short'),
})

const inlineChapterSchema = z.object({
  title: z.string().min(1),
})

/* ===================== Component ===================== */
const ChaptersList: React.FC<ChaptersListProps> = ({ category }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const [isEditing, setIsEditing] = useState(false)
  const toggleEditing = () => setIsEditing((c) => !c)

  const [modules, setModules] = useState<Module[]>(() => category?.modules ?? [])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Add-lesson dialog state (module id that we're adding to)
  const [addOpenFor, setAddOpenFor] = useState<string | null>(null)

  // RHF for the Add-Lesson dialog
  const addForm = useForm<z.infer<typeof addLessonSchema>>({
    resolver: zodResolver(addLessonSchema),
    defaultValues: { title: '' },
  })
  const { isSubmitting, isValid } = addForm.formState

  if (!category) return null

  /* -------- Module editing -------- */
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

  /* -------- Lesson editing -------- */
  const onEditLesson = (lessonId: string) => {
    router.push(`/admin/courses/${category.id}/Lessons/${lessonId}`)
  }
  const onDeleteLesson = (lessonId: string) => {
    // hook your delete here
    console.log('Delete lesson', lessonId)
  }

  /* -------- Optional inline chapter create (unchanged) -------- */
  const inlineForm = useForm<z.infer<typeof inlineChapterSchema>>({
    resolver: zodResolver(inlineChapterSchema),
    defaultValues: { title: '' },
  })
  const createChapterSubmitting = inlineForm.formState.isSubmitting
  const createChapterValid = inlineForm.formState.isValid
  const onSubmitInline = async (values: z.infer<typeof inlineChapterSchema>) => {
    console.log(values)
    toast.success('Chapter Created')
    toggleEditing()
  }

  const selectedModule =
    selectedModuleId != null ? modules.find((m) => m.id === selectedModuleId) : undefined

  const numericModuleId =
    selectedModuleId != null && !Number.isNaN(Number(selectedModuleId))
      ? Number(selectedModuleId)
      : undefined

  /* ===================== Create Lesson + Redirect ===================== */
 const handleCreateLesson = addForm.handleSubmit(async ({ title }) => {
  if (!addOpenFor) {
    toast.error('No module selected.')
    return
  }

  const targetModule = modules.find((m) => m.id === addOpenFor)
  const nextOrder = (targetModule?.lessons?.length ?? 0) + 1

  const payload = {
    title,
    moduleId: addOpenFor,
    order: nextOrder,
  }

  try {
    const user = await getSession()
    const accessToken = (user as any)?.accessToken
    if (!accessToken) throw new Error('Missing access token')

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/lessons`,
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    // Try common response shapes to get the new lesson id
    const newLessonId =
      res?.data?.id ??
      res?.data?.lesson?.id ??
      res?.data?.data?.id

    if (!newLessonId) throw new Error('Could not determine created lesson id')

    toast.success('Lesson created successfully!')

    // close/reset dialog before navigating
    setAddOpenFor(null)
    addForm.reset({ title: '' })

    // Redirect to /admin/courses/[slug]/Lessons/[LessonsId]
    router.push(`/admin/courses/${category.id}/Lessons/${newLessonId}`)
  } catch (e: any) {
    console.error(e)
    toast.error(e?.response?.data?.message || e?.message || 'Something went wrong')
  }
})


  /* ===================== Render ===================== */
  return (
    <>
      <ProductModal
        key={selectedModuleId ?? 'no-module'}
        open={modalOpen}
        onOpenChange={setModalOpen}
        moduleId={numericModuleId}
        initialTitle={selectedModule?.ModuleTitle ?? ''}
        onSave={async (values, ctx) => {
          const idStr =
            ctx?.moduleId != null ? String(ctx.moduleId) : selectedModuleId ?? undefined
          if (idStr == null) return
          setModules((prev) =>
            prev.map((m) => (m.id === idStr ? { ...m, ModuleTitle: values.title } : m))
          )
        }}
      />

      {/* Optional: existing inline chapter create form */}
      {isEditing && (
        <Form {...inlineForm}>
          <form onSubmit={inlineForm.handleSubmit(onSubmitInline)} className="space-y-4 mt-4">
            <FormField
              control={inlineForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={createChapterSubmitting}
                      placeholder="e.g Introduction to the course"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!createChapterValid || createChapterSubmitting} type="submit">
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

                      {/* Edit module */}
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

                      {/* Delete module */}
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

                    {/* Add lesson button — opens shadcn Dialog */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-sky-700 hover:text-sky-900"
                      onClick={() => setAddOpenFor(module.id)}
                    >
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

      {/* Add-Lesson Dialog */}
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
