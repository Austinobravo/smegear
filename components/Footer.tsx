import { Book, Facebook, Handshake, Instagram, LucideFacebook, LucideInstagram, LucideTwitter, LucideYoutube, Mail, Phone, ScreenShare, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const socialLinks = [
  {
    link: 'facebook',
    image: <LucideFacebook/>
  },
  {
    link: 'instagram',
    image: <LucideInstagram/>
  },
  {
    link: 'facebook',
    image: <LucideTwitter/>
  },
  {
    link: 'instagram',
    image: <LucideYoutube/>
  },
 
]
const Footer = () => {
  return (
    <section className='bg-black md:px-12 px-6 py-10'>
        <div className=' flex md:flex-no-wrap flex-wrap text-white pb-5'>
          <div className='md:basis-1/4'>
            <Image src={`/new_logo.png`} width={200} height={100} alt='logo' className='object-cover h-20 '/>
            <p className='text-sm opacity-80 pb-10'>Excellence with Speed - As our motto  stands, we strategize, execute, deliver as the motto signifies.</p>
            <div className='text-xs py-5 space-y-2'>
              <div className='flex'><Mail size={12} className='mr-2'/> <Link href='mailto:smegearhub@gmail.com'>Smegearhub@gmail.com</Link></div>
              <div className='flex'><Phone size={12} className='mr-2'/> <Link href='tel:+234 706327 6937'>+234 706327 6937</Link></div>
            </div>
            <div className='flex gap-6 text-white'>
                {socialLinks.map(((socials, index) => (
                  <Link key={index} href={socials.link}>
                    {socials.image}
                  </Link>
                )))}
            </div>
          </div>
          <div className='pt-10 space-y-3 md:basis-1/4'>
            <h2 className='text-blue-500 text-xl '>Why Pick Us?</h2>
            <div className='flex space-x-1 items-center'>
              <Book/>
              <p className='opacity-80'>We Plan</p>
            </div>
            <div className='flex space-x-1 items-center'><ScreenShare/> <p className='opacity-80'>We Execute</p></div>
            <div className='flex space-x-1 items-center'><Handshake/><p className='opacity-80'>We Deliver</p></div>
            

          </div>
          <div className='md:basis-1/2 pt-10'>
            <h3 className='text-blue-500 text-xl '>Our Offices</h3>
            <div>
              <p className='text-sm'>Locate us on Google Maps</p>
              <div className='w-full my-5'>
              <iframe width="100%" height="200" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%Turkei%Plaza,%Yola,%Adamawa,%Nigeria+(Voting)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
              </div>
            </div>

          </div>


        </div>
        <hr className='opacity-70 pb-2'/>
        <div className='text-center text-white opacity-70 text-sm'>
          <p>Copyright &copy; {new Date().getFullYear()}. All rights reserved</p>
       </div>
      
    </section>
  )
}

export default Footer
