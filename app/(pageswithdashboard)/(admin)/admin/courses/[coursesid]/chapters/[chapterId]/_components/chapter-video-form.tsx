"use client"
import React, { useState } from 'react'
import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"

import { ImageIcon, ImagePlus, Pencil, PlusCircle, Video, VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

import Image from 'next/image';



// interface DescriptionProps{
//   initialData:{
//     title:string;
//   };
//   courseId:string;
// }


const ChapterVideoForm = () => {
  const [imgUpload, setImgUpload] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)
  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'><div className='font-medium flex items-center justify-between'>
      Course video
      <Button onClick={toggleEdit} variant="ghost">
        {isEditing && (<>Cancel</>)}{!isEditing && !imgUpload && (<><PlusCircle className='h-4 w-4 mr-2' />
          Add a video
        </>)}
        {!isEditing && imgUpload && (<><Pencil className='h-4 w-4 mr-2' />Edit Video</>)}
      </Button>
    </div>
      {!isEditing && (!imgUpload ? (<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
        <Video className='h-10 w-10 text-slate-500' />
      </div>) : (<div className='relatve aspect-video mt-2'> <Image alt='Upload' fill className='object-cover rounded-md' src="" /></div>))}



      {isEditing && (<div className='flex flex-col justify-center items-center'>
        <VideoIcon className='h-52 w-60 text-slate-500 cursor-pointer' />
        <h1 className='text-xl font-bold'>Choose File</h1>
        <div className='text-xs text-muted-foreground mt-4'>
          Upload this chapter's video
        </div>
      </div>)}
      {imgUpload && !isEditing && (
        <div className='text-xs text-muted-foreground mt-2'>
          Videos can take a few minutes to process.Refresh the page if video doesnot appear
        </div>
      )}
    </div>
  )
}

export default ChapterVideoForm