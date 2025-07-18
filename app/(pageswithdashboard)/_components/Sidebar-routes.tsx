"use client"

import { BarChart, Compass, Handshake, Layout, List, Settings } from 'lucide-react'
import React from 'react'
import SidebarItem from './Sidebar-item'
import { usePathname } from 'next/navigation'

 const studentRoutes=[
  {
    icon:Layout,
    label:"Dashboard",
    href:"/student",
  },
  {
    icon:Compass,
    label:"Browse",
    href:"/student/search",
  },
  {
    icon:Handshake,
    label:"Affiliate",
    href:"/student/affiliate",
  },
  {
    icon:Settings,
    label:"Settings",
    href:"/student/settings",
  },
]

const adminRoutes=[ {
    icon:List,
    label:"Courses",
    href:"/admin/courses",
  },
  {
    icon:BarChart,
    label:"Analytics",
    href:"/admin/analytics",
  },
  ]
const SidebarRoutes = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes('/admin');
  const routes=isAdminPage ? adminRoutes : studentRoutes;
 
  
  return (
    <div className='flex flex-col w-full'>{routes.map((route)=>(
      <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href}/>
    ))}</div>
  )
}

export default SidebarRoutes