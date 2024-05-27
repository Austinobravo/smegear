'use client'
// import FadeInSection from '@/hooks/fadeIn'
import React from 'react'
import CountUp from 'react-countup'

const Text = [
    {
        heading: '5',
        paragraph: 'Years of Experience'
    },
    {
        heading: '15',
        paragraph: 'Experienced Staff'
    },
    {
        heading: '400',
        paragraph: 'Projects Impacted'
    },
]
const Counter = () => {
  return (
    <section className='py-16 '>
        
            <div className='grid md:grid-cols-3 grid-cols-2 gap-y-2 md:gap-16 w-full mx-auto'>
                {Text.map((item, index) => (
                    <div key={index} className='flex flex-col items-center justify-center space-y-3'>
                        <h2 className='text-[#FFA807] md:text-6xl sm:text-4xl text-2xl'><CountUp start={0} end={parseInt(item.heading)} duration={10}/><sup>+</sup></h2>
                        <span className='md:text-lg sm:text-sm text-xs  text-blue-900 hover:underline'>{item.paragraph}</span>
                    </div>
                ))}

            </div> 
        
    </section>
  )
}

export default Counter
