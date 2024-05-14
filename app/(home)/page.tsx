import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from './_components/Hero'
import Brands from './_components/Brands'
import About from './_components/About'

const page = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Brands/>
      <About/>
      
    </div>
  )
}

export default page
