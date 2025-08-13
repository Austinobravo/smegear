"use client"
import React, { useState } from 'react'
import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';



interface LessonTitleFormProps{

  chaptersId:string;
}


const LessonTitleForm = ({chaptersId}:LessonTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)
  const formSchema = z.object({
    title: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    toast.success("Chapter Title Saved")

  }
  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'><div className='font-medium flex items-center justify-between'>
      Lesson title
      <Button onClick={toggleEdit} variant="ghost">
        {isEditing && (<>Cancel</>)}{!isEditing && (<><Pencil className='h-4 w-4 mr-2' />
          Edit title
        </>)}</Button>
    </div>
      {!isEditing && (<p className='text-sm mt-2'>{chaptersId}</p>)}
      {isEditing && (<Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
        <FormField control={form.control} name="title" render={({ field }) => {
          return (<FormItem>
            <FormControl>
              <Input disabled={isSubmitting} placeholder="e.g 'Introduction to the course'" {...field} className='bg-white' />
            </FormControl>
            <FormMessage />
          </FormItem>)

        }} />
        <Button disabled={!isValid || isSubmitting} type='submit'>
          Save
        </Button>
        </form></Form>)}
    </div>
  )
}

export default LessonTitleForm