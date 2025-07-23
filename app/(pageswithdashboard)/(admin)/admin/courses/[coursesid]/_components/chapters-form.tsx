"use client"
import React, { useState } from 'react'
import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Pencil, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import ChaptersList from './chapters-list';
import Items from '@/Data/items';


// interface DescriptionProps{
//   initialData:Course
//    courseId:string;
//   
//   
// }



const ChaptersForm = () => {
  
  const [chapters, setIsChapters] = useState(false)
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false)
  const toggleCreating = () => setIsCreating((current) => !current)
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
    toast.success("Chapter Created")
    toggleCreating();

  }
  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'><div className='font-medium flex items-center justify-between'>
      Course chapters
      <Button onClick={toggleCreating} variant="ghost">
        {isCreating && (<>Cancel</>)}{!isCreating && (<><PlusCircle className='h-4 w-4 mr-2' />
          Add a chapter
        </>)}</Button>
    </div>

      {isCreating && (<Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
        <FormField control={form.control} name="title" render={({ field }) => {
          return (<FormItem>
            <FormControl>
              <Input disabled={isSubmitting} placeholder="e.g Introduction to the course" {...field} className='bg-white' />
            </FormControl>
            <FormMessage />
          </FormItem>)

        }} />
        <Button disabled={!isValid || isSubmitting} type='submit'>
          Create
        </Button>
      </form></Form>)}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !chapters && "text-slate-500 italic"
           
        )}>
     {Items.length===0 && "No chapters"}
     <ChaptersList
     Items={Items}
     
     
     />
    </div>
  )
}
{
  !isCreating && (
    <p className='text-xs text-muted-foreground mt-4'>
      Drag and drop to reorder the chapters
    </p>
  )
}
    </div >
  )
}

export default ChaptersForm