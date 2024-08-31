'use client'
import { navLinks, socialLinks } from '@/globals'
import { handleSmoothScrolling } from '@/hooks/handleScroll'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MobileNav = () => {
  const [isNavClicked, setIsNavClicking] = React.useState<boolean>(false)
  const [isNavScrolling, setIsNavScrolling] = React.useState<boolean>(false)

  React.useEffect(()=> {
    const handleScroll = () => {
      setIsNavScrolling(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  React.useEffect(()=> {
    const handleResize = () => {
      if(window.innerWidth >= 756){
        setIsNavClicking(false)
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])

  React.useEffect(() => {
    if (isNavClicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isNavClicked]);

  
  return (
    <>
    <nav id='mobileNav' className={`flex px-6 items-center w-full justify-between fixed h-24 ${isNavScrolling && '!backdrop-blur-xl z-10 bg-white/70'}`}>
        <Link href={`/`} id='logo' className='-z-20'>
            <Image src={`https://sme-gear.s3.amazonaws.com/1-d-passportPhoto-1710430072893-logo.webp`} alt='logo' width={150} height={100}/>
        </Link>
        {!isNavClicked && 
          <div className='text-amber-500 bg-blue-700 rounded-full p-2 hover:cursor-pointer' onClick={()=> {setIsNavClicking(!isNavClicked)}}>
              <Menu size={25} className='hover:scale-110 transition-all duration-500'/>
          </div>
        }
      
    </nav>
    <div className={`transition-all delay-150 border-t-2 border-amber-500 duration-700 ease-in-out  ${isNavClicked ? 'left-0' :'!-translate-x-full '}`}>
      {isNavClicked && 
        <div className={` `}>
          <div className={`fixed w-screen h-screen bg-black/50 top-0 left-0 z-20 `} onClick={()=> {setIsNavClicking(!isNavClicked)}}>
            <div className='text-amber-500 bg-blue-700 rounded-full p-2 hover:cursor-pointer w-fit ml-auto mt-14 mr-6 '>
                <X size={25} className='hover:rotate-45 transition-all delay-200 duration-500'/>
            </div>
          </div>
          <div className={`bg-white w-72 z-20 h-screen fixed `}>
            <div className='flex justify-center items-center'>
              <Image src={`https://sme-gear.s3.amazonaws.com/1-d-passportPhoto-1710430072893-logo.webp`} alt='logo' width={150} height={100}/>
            </div>
            <div>
              <ul>
                {navLinks.map((navLink, index) => (
                  <Link key={index} href={navLink.path} onClick={(event)=>{handleSmoothScrolling(event,navLink.path)}} className=''>
                    <li className='border-b font-bold text-sm py-2 mx-4 hover:text-blue-700 transition-all' onClick={()=> {setIsNavClicking(!isNavClicked)}}>{navLink.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className='flex justify-center items-center gap-6 bottom-20 w-full absolute'>
                  {socialLinks.map(((socials, index) => (
                    <Link key={index} href={socials.link} className='hover:text-amber-500 text-blue-700'>
                      {socials.image}
                    </Link>
                  )))}
            </div>
            <div className='text-center opacity-70 text-sm bottom-10 absolute w-full'>
              <p>Copyright &copy; {new Date().getFullYear()}. All rights reserved</p>
            </div>
          </div>
        </div>
      }

    </div>
    </>
  )
}

export default MobileNav
