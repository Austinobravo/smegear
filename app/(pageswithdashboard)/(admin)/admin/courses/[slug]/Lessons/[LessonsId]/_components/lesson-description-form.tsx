"use client"
import React, { useState } from 'react'
import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Editor } from '@/components/globals/editor';



interface LessonDescriptionFormProps {

  chaptersId: number;


}


const LessonDescriptionForm = ({ chaptersId }: LessonDescriptionFormProps) => {
  const [isChapter,setIsChapter]=useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)
  const formSchema = z.object({
    description: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: ""
    },
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    toast.success("Chapter updated")

  }
  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'><div className='font-medium flex items-center justify-between'>
      Lesson description
      <Button onClick={toggleEdit} variant="ghost">
        {isEditing && (<>Cancel</>)}{!isEditing && (<><Pencil className='h-4 w-4 mr-2' />
          Edit description
        </>)}</Button>
    </div>
      {!isEditing && (<div className={cn('text-sm mt-2', !isChapter && "text-slate-500 italic")}>{!isChapter && "No description"}
        {isChapter && chaptersId}
      </div>)}
      {isEditing && (<Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
        <FormField control={form.control} name="description" render={({ field }) => {
          return (<FormItem>
            <FormControl>
              <Editor  {...field}  />
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

export default LessonDescriptionForm