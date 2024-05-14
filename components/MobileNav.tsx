import { Menu } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const MobileNav = () => {
  return (
    <div className='flex px-6 items-center w-full justify-between fixed'>
        <div id='logo'>
            <Image src={`https://sme-gear.s3.amazonaws.com/1-d-passportPhoto-1710430072893-logo.webp`} alt='logo' width={150} height={100}/>
        </div>
        <div className='text-amber-500'>
            <Menu size={20}/>
        </div>
      
    </div>
  )
}

export default MobileNav
