"use client"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { CourseTitleSchema } from "@/lib/formSchema";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'
import { getSession, useSession } from 'next-auth/react'
 

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // description:z.string().min(1, "Description is required"),
  // price:z.number().min(0, "Price must be a positive number"),
})


const CreatePage = () => {
  const router = useRouter()
  const {data:session} = useSession()

  React.useEffect(()=> {
    console.log("session", session)
  }, [session])

  const form = useForm({
    resolver: zodResolver(CourseTitleSchema),
    defaultValues: {
      title: "",
      // description: "",
      // imageUrl: "",
      // price: 0,
      // published: false,
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  async function onSubmit(values: z.infer<typeof CourseTitleSchema>) {
    const user = await getSession()
    const accessToken = user?.accessToken
    console.log("accesstoken", accessToken)
    setError(null);
    setResult(null);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, values, 
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
      );
      console.log("res", res)

      // setResult(res.data);
      // console.log("Created course:", res.data);
      toast.success("Course created successfully!");
      router.push(`/admin/courses`)
      form.reset(); // optional

    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {

    }
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
              <Button type='submit' className="min-w-40" disabled={!isValid || isSubmitting} >
                 {isSubmitting ?
                <div className="loader"></div>
                :
                <span>Continue</span>
                }
                
              </Button>
            </div>
          </form>
        </Form>
      </div>


      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {result && (
        <pre className="rounded-md bg-muted p-4 text-sm overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

    </div>
  )
}

export default CreatePage