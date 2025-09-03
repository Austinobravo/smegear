import { LucideIcon } from 'lucide-react';
import React from 'react'

interface PurchasedCourseSidebarProps {
  category: {

    date: string; progress: number; chapters: number; Category: string; id: number; title: string; description: string; image: string; rating: number;
    icon: LucideIcon;
    oldPrice: string | null;
  }
}
const PurchasedCourseSidebar = ({ category }: PurchasedCourseSidebarProps) => {
  if (!category) return null;

  return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'><div><h1>
      {category.title}
    </h1></div></div>
  )
}

export default PurchasedCourseSidebar