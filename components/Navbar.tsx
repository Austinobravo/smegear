import React from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav>
        <div className='md:flex hidden'>
            <DesktopNav/>
        </div>
        <div className='block md:hidden'>
            <MobileNav/>
        </div>
      
    </nav>
  )
}

export default Navbar
