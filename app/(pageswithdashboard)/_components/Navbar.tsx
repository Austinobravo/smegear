import React, { Suspense } from 'react'
import MobileSidebar from './Mobile-sidebar'
import NavbarRoutes from '@/components/Navbar-routes'

const NavbarPage = () => {
  return (
     <Suspense fallback={<div className='text-center'>loading...</div>}>
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm"><MobileSidebar/>
        <NavbarRoutes/>
        </div>
    </Suspense>
      )
}

export default NavbarPage