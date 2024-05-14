import { Building, Bus, Handshake } from 'lucide-react'
import React from 'react'

const About = () => {
  return (
    <section id='about' className='py-10 md:px-12 px-6'>
        <div className='bg-amber-100/50 rounded-full px-4 py-1 w-fit'>
            <h3 className='font-mono text-blue-700'>ABOUT US</h3>
        </div>
        <div className='py-5 space-y-7'>
            <h4 className='text-5xl'>We Offer the Best Services </h4>
            <p className='font-medium'>We are a team of commited professionals who take cognizance that your business requires a legal backing ranging from our legal registration process to give your business a premium online presence.</p>
        </div>
        <div className='flex md:flex-nowrap flex-wrap justify-between'>
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

        </div>
    </section>
  )
}

export default About
