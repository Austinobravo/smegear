'use client'

import * as React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export const ProductFormSchema = z.object({
  title: z
    .string({ required_error: 'A title is required.' })
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be 100 characters or less'),
})

export type ProductFormValues = z.infer<typeof ProductFormSchema>

type SaveCtx = { moduleId?: number }

export type ProductModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  moduleId?: number
  initialTitle?: string
  onSave?: (values: ProductFormValues, ctx?: SaveCtx) => Promise<void> | void
}

export default function ProductModal({
  open,
  onOpenChange,
  moduleId,
  initialTitle = '',
  onSave,
}: ProductModalProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: { title: initialTitle },
    mode: 'onChange',
  })

  // keep the form in sync when a different module is chosen
  React.useEffect(() => {
    form.reset({ title: initialTitle })
  }, [initialTitle, form, open])

  async function onSubmit(values: ProductFormValues) {
    try {
      await onSave?.(values, { moduleId })
      toast.success('Saved', {
        description: `Title: ${values.title}`,
      })
      onOpenChange(false)
      form.reset()
    } catch (e: any) {
      toast.error('Could not save', { description: e?.message ?? 'Unknown error' })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Module Title</DialogTitle>
          <DialogDescription>
            {moduleId != null ? `Module #${moduleId}` : null}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Introduction" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex gap-5">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-smegear-secondary hover:bg-smegear-accent">
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
