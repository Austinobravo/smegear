import Image from 'next/image'
import React from 'react'
const images = [
    '/logo.webp',
    '/logo.webp',
    '/logo.webp',
    '/logo.webp',
    '/logo.webp',
    '/logo.webp',
    '/logo.webp',
    '/logo.webp',
]
const Brands = () => {
  return (
    <section className='bg-gray-200 flex gap-5 overflow-hidden bg-cover' style={{backgroundImage: 'url(/logo.webp)'}}>
        {/* <div className='animate-slider flex space-x-4 justify-center items-center w-full'>
            {images.map((image, index) => (
                <div key={index} className='overflow-hidden filter grayscale hover:grayscale-0'>
                    <Image src={image} width={100} height={100} alt='brands' className='w-full h-auto slide-image'/>
                </div>
            ))}

        </div> */}
        
    </section>
  )
}

export default Brands