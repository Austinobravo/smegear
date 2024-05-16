import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from './_components/Hero'
import Brands from './_components/Brands'
import About from './_components/About'
import Team from './_components/Team'

const page = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Brands/>
      <About/>
      <Team/>
      
    </div>
  )
}

export default page
