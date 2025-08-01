import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './Sidebar-routes'
import Link from 'next/link'


const Sidebar = () => {
  return (
    <div className='h-full border-r flex-col overflow-y-auto bg-white shadow-sm'><div className='p-6'>
      <Link href='/'>

        <Logo />
      </Link>

    </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar