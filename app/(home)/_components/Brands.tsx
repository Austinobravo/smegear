import Image from 'next/image'
import React from 'react'
const images = [
    '/brands/1.jpg',
    '/brands/2.jpg',
    '/brands/3.jpg',
    '/brands/4.jpg',
    '/brands/5.jpg',
    '/brands/6.jpg',
    '/brands/7.jpg',
    '/brands/8.jpg',
    '/brands/9.jpg',
    '/brands/10.jpg',
    '/brands/11.jpg',
    '/brands/12.jpg',
    '/brands/13.jpg',
    '/brands/14.jpg',
    '/brands/15.jpg',
    '/brands/16.jpg',
    '/brands/17.jpg',
    '/brands/18.jpg',
    '/brands/19.jpg',
    '/brands/20.jpg',
    '/brands/21.jpg',
    '/brands/22.jpg',
    '/brands/23.jpg',
    '/brands/24.jpg',
    '/brands/25.jpg',
    '/brands/26.jpg',
    '/brands/27.jpg',
    '/brands/28.jpg',
    '/brands/29.jpg',
]
const Brands = () => {
  return (
    <section id='brands' className='flex bg-gray-200 gap-5 h-20 overflow-hidden bg-cover ' style={{backgroundImage: 'url(/logo.webp)'}}>
        <div className='animate-slider flex  space-x-4 justify-center items-center w-full '>
            {/* {images.map((image, index) => (
                <div key={index} className='overflow-hidden w-full'>
                    <Image src={image} width={100} height={100} alt='brands' className='w-full h-auto slide-image'/>
                </div>
            ))} */}

        </div>
        
    </section>
  )
}

export default Brands