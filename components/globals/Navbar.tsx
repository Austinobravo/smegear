import React from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav>
        <div className='hidden lg:flex'>
            <DesktopNav/>
        </div>
        <div className='block lg:hidden'>
            <MobileNav/>
        </div>
      
    </nav>
  )
}

export default Navbar
