'use client'
import { navLinks } from '@/globals'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MobileNav = () => {
  const [isNavClicked, setIsNavClicking] = React.useState<boolean>(false)
  const [isNavScrolling, setIsNavScrolling] = React.useState<boolean>(false)
  React.useEffect(()=> {
    const handleScroll = () => {
      setIsNavScrolling(window)
    }
  },[])
  return (
    <>
    <div className='flex px-6 items-center w-full justify-between fixed '>
        <div id='logo' className='-z-20'>
            <Image src={`https://sme-gear.s3.amazonaws.com/1-d-passportPhoto-1710430072893-logo.webp`} alt='logo' width={150} height={100}/>
        </div>
        {!isNavClicked && 
          <div className='text-amber-500 bg-blue-700 rounded-full p-2 hover:cursor-pointer' onClick={()=> setIsNavClicking(!isNavClicked)}>
              <Menu size={25}/>
          </div>
        }
      
    </div>
    {isNavClicked && 
      <div>
        <div className='fixed w-screen h-screen bg-black/50 top-0 left-0' onClick={()=> setIsNavClicking(!isNavClicked)}>
          <div className='text-amber-500 bg-blue-700 rounded-full p-2 hover:cursor-pointer w-fit ml-auto mt-14 mr-6'>
              <X size={25}/>
          </div>
        </div>
        <div className='bg-white w-72 z-20 h-screen fixed'>
          <div>
            <Image src={`https://sme-gear.s3.amazonaws.com/1-d-passportPhoto-1710430072893-logo.webp`} alt='logo' width={150} height={100}/>
          </div>
          <div>
            <ul>
              {navLinks.map((navLink, index) => (
                <Link key={index} href={navLink.path}>
                  <li>{navLink.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default MobileNav
