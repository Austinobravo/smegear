"use client"
import { CircleUser, LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname?.startsWith('/admin');
  const isChapter = pathname?.startsWith('/chapter');
  return (
    <div className='flex gap-x-2 ml-auto items-center'>
      {isAdmin || isChapter ? (
        <Link href="/student">
        <Button className='bg-smegear-secondary hover:bg-smegear-accent size="sm"'>
          <LogOut className='h-4 w-4 mr-2' />
          Exit
        </Button>
        </Link>
      ) : (<Link href="/admin/courses"><Button className='bg-smegear-secondary hover:bg-smegear-accent size="sm"'>Admin mode</Button></Link>)}
      <CircleUser size={32} className='bg-smegear-secondary rounded-full text-white border-none hover:bg-smegear-accent' /></div>
  )
}

export default NavbarRoutes