
import { ArrowRight, Building, Bus, Handshake } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const About = () => {
   
  return (
    <section id='about' className='py-10 md:mx-12 rounded-md bg-white px-6'>
        <div className=''>
            <h3 className='font-mono text-blue-700'>ABOUT US</h3>
        </div>
        <div className='space-y-7'>
            <h4 className='text-2xl font-bold'>We Offer the Best Services </h4>
        </div>
        <div className='flex '>
            <div className='font-medium basis-1/2 py-10  space-y-2'>
                <p className='opacity-70'>We are a team of commited professionals who take cognizance that your business requires a legal backing ranging from our legal registration process to give your business a premium online presence.</p>
                <p className='opacity-70'>We make time worth strategy that help your business grow giving upright consultation for the longetivity of the business.</p>
                <div>
                <Link href={``} className='bg-amber-500 text-white  hover:scale-105 rounded-full font-bold py-3 px-5 w-fit flex items-center '>
                  Consult Now
                  <ArrowRight className='animate-pulse'/>
                </Link>  
              </div>
            </div>
            <Image src={`/smegear.jpg`} width={500} height={100} alt='logo' className='basis-1/2 object-contain hover:object-scale-down h-72 w-full '/>
        </div>
        
        {/* <div className='flex md:flex-nowrap flex-wrap justify-between'>
            <div>
                <div className='border-dashed border border-amber-500 w-fit p-2'>
                    <Handshake/>
                </div>
                <p>We Consult</p>
            </div>
            <div>
                <div className='border-dashed border border-amber-500 w-fit p-2'>
                    <Building/>
                </div>
                <p>We Build</p>
            </div>
            <div>
                <div className='border-dashed border border-amber-500 w-fit p-2'>
                    <Bus/>
                </div>
                <p>We Deliver</p>
            </div>

        </div> */}
    </section>
  )
}

export default About
