"use client"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // description:z.string().min(1, "Description is required"),
  // price:z.number().min(0, "Price must be a positive number"),
})

const CreatePage = () => {
  const route = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",

    }
  })
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response = await axios.post("/api/courses", values)
      route.push(`/admin/courses/${1}`)
      toast.success("Course Created");

    } catch { toast.error("Something went wrong") }

  }
  return (
    <div className='max-w-5xl mx-auto flex md:justify-center h-full md:items-center p-6  '>
      <div>
        <h1 className='text-2xl'>Name your course</h1>
        <p className='text-sm text-slate-600'>What will you like to name your course? Don&apos;t worry, you can change this later.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder='e.g. "Advanced web development"' />
                  </FormControl>
                  <FormDescription>What will you teach in this course?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Link href="/"><Button className='bg-slate-600 hover:bg-slate-700' type='button'>Cancel</Button></Link>
              <Button type='submit' disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>

    </div>
  )
}

export default CreatePage