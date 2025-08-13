"use client"
import React, { useState } from 'react'
import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"

import { ImageIcon, ImagePlus, Pencil, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

import Image from 'next/image';



// interface DescriptionProps{
//   initialData:{
//     title:string;
//   };
//   courseId:string;
// }
const formSchema=z.object({
  url:z.string().min(1)
});
const onSubmit=async(values:z.infer<typeof formSchema>)=>{
  try{
    console.log(values)
    toast.success("Course updated")
  }catch {toast.error("something went wrong")}
}


const AttachmentForm = () => {
  const [imgUpload, setImgUpload] = useState(false)
  const [deletingId,setDeletingId]=useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)






  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'><div className='font-medium flex items-center justify-between'>
      Course attachments
      <Button onClick={toggleEdit} variant="ghost">
        {isEditing && (<>Cancel</>)}{!isEditing && (<><PlusCircle className='h-4 w-4 mr-2' />
          Add a file
        </>)}

      </Button>
    </div>
      {!isEditing && (<>
        {!imgUpload && (<p className='text-sm mt-2 text-slate-500 italic'>
          No attachments yet
        </p>)}
        {imgUpload&& (<div className='space-y-2'>
          <p>
UPLOADED IMAGE WILL DISPLAY HERE
          </p>
          
        </div>)}
      </>)}



      {isEditing && (<div className='flex flex-col justify-center items-center'>
        <ImagePlus className='h-52 w-60 text-slate-500 cursor-pointer' />
        <h1 className='text-xl font-bold'>Choose File</h1>
        <div className='text-xs text-muted-foreground mt-4'>
          Add anything your student might need to complete the course.
        </div>
      </div>)}
    </div>
  )
}

export default AttachmentForm