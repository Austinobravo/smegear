import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from './_components/Hero'
import Brands from './_components/Brands'
import About from './_components/About'
import Team from './_components/Team'
import Services from './_components/Services'
import Footer from '../../components/Footer'

const page = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Brands/>
      <About/>
      <Team/>
      <Services/>
      <Footer/>
      
    </div>
  )
}

export default page
