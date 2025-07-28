"use client"
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Grid, Grip, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'


type ChapterItem = {
  id: number;
  name: string;
  isPublished: boolean;
  free: boolean;
};
type ChaptersListProps = {
  Items: ChapterItem[];
};


const ChaptersList = ({ Items }: ChaptersListProps) => {
  const router = useRouter()
  const onEdit = (id: string) => {
    router.push(`/admin/courses/${id}/chapters/${id}`)
  }
  return (
    <div>{Items.map((chapter) => (
      <div key={chapter.id} className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm", chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700")}>
        <div className={cn("px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition", chapter.isPublished && "border-r-sky-200 hover:bg-sky-200")}>
          <Grip className='h-5 w-5' />
        </div>
        {chapter.name}
        <div className='ml-auto pr-2 flex items-center gap-x-2'>
          {chapter.free && (
            <Badge>
              Free
            </Badge>
          )}
          <Badge className={cn("bg-slate-500", chapter.isPublished && "bg-sky-700")}>
            {chapter.isPublished ? "Published" : "Draft"}
          </Badge>
          <Pencil onClick={() => { onEdit(chapter.name) }} className='w-4 h-4 cursor-pointer transition hover:opacity-75' />

        </div>
      </div>
    ))}</div>
  )
}

export default ChaptersList;