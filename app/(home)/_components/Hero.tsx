import { ArrowDown, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section>
      <div className='w-full h-[620px] bg-cover bg-black md:px-12 px-6' style={{backgroundImage: 'url(https://themexriver.com/wp/gilroy/wp-content/uploads/2024/03/h1-img-1.webp)'}}>
          <div className='flex md:flex-nowrap flex-wrap pt-36  gap-x-10 '>
            <div className='text-white flex md:!flex-none flex-col  '>
              <span className='flex text-amber-500'>
                  <Star size={12}/>
                  <h1 className='md:text-sm text-sm font-bold'>SmeGear Digital <span className='text-blue-700'>Agency</span></h1>
              </span>
              <h2 className='md:text-6xl md:max-w-[700px]  text-4xl'>
                Your One Stop <span className='text-blue-700'>Agency</span> With Exceptional Services.
              </h2>
              <p className='md:text-xl md:max-w-[800px]  text-base py-7'>
                We are a digital agency that caters for <span className='text-amber-500'>small and medium enterprises</span> ensuring an online presence for our clients.
              </p>
              <div>
                <Link href={``} className='bg-blue-700  hover:scale-105 rounded-full font-bold py-3 px-5 w-fit flex items-center '>
                  Explore More
                  <ArrowRight className='animate-pulse'/>
                </Link>  
              </div>
            </div>
            {/* <div/> */}
            {/* <div id='video' className='basis-1/2 w-full'>
              <video className='rounded-lg w-full' autoPlay muted loop src='https://themexriver.com/wp/gilroy-videos/hero/video-2.mp4'>

              </video>

            </div> */}
          </div>
            <div className='bg-white mt-16 text-red-300 p-3 animate-bounce rounded-full w-fit mx-auto '>
              <Link href={`#brands`} className='bg-white animate-pulse'>
                <ArrowDown color='red' size={28} fontVariant={900}/>
              </Link>
            </div>
          {/* <div className='w-20'>
            <svg viewBox="0 0 200 200" className="text">
              <path id="textPath" d="M 85,0 A 85,85 0 0 1 -85,0 A 85,85 0 0 1 85,0" transform="translate(100,100)" fill="none" stroke-width="0"></path>
              <g>
                  <text text-anchor="start">
                  <textPath className="round-text text-uppercase" href="#textPath" startOffset="0%">scroll down-- scroll down-- scroll down--  </textPath>
                  </text>
              </g>
          </svg>

          </div> */}

      </div>
      
      
    </section>
  )
}

export default Hero
