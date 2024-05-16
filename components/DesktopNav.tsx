import { navLinks } from '@/globals'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DesktopNav = () => {
  return (
    <div className='flex items-center justify-between fixed w-full md:px-12 px-6'>
        <div id='logo'>
            <Image src={`https://sme-gear.s3.amazonaws.com/1-d-passportPhoto-1710430072893-logo.webp`} alt='logo' width={150} height={100}/>
        </div>
        <div id='navLinks'>
            <ul className='flex space-x-12 text-lg'>
                {navLinks.map((links, index) => (
                    <li key={index}>
                        <Link href={links.path} className={`${links.path === '/' && "!text-amber-500 border-b-2 border-blue-700"} text-blue-700 font-semibold`}>
                            {links.name}
                        </Link>
                    </li>
                ))}

            </ul>
        </div>
      
    </div>
  )
}

export default DesktopNav
