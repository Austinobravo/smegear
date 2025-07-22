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
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/format';



// interface DescriptionProps{
//   initialData:Course
//    courseId:string;
//   
//   
// }


const PriceForm = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [pricing,setPricing]=useState(false)


  const toggleEdit = () => setIsEditing((current) => !current)
  const formSchema = z.object({
    price: z.number().min(1, {
      message: "Price is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0.00
    },
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    toast.success("Price Saved")

  }
  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'><div className='font-medium flex items-center justify-between'>
      Course price
      <Button onClick={toggleEdit} variant="ghost">
        {isEditing && (<>Cancel</>)}{!isEditing && (<><Pencil className='h-4 w-4 mr-2' />
          Edit Price
        </>)}</Button>
    </div>
      {!isEditing && (<p className={cn("text-sm mt-2",!pricing&& "text-slate-500 italic")}>{pricing?formatPrice(0.00):"No price"}</p>)}
      {isEditing && (<Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
        <FormField control={form.control} name="price" render={({ field }) => {
          return (<FormItem>
            <FormControl>
              <Input type='number'
                step='0.01'
                disabled={isSubmitting} placeholder="Set a price for your course " {...field}
                className='bg-white' />
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

export default PriceForm