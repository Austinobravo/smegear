import React from 'react'
import PageHeader from '../../_components/Hero2'
import CoursesSection from './_components/ServicesProvided'

const AboutPage = () => {
  const background="/hero2.webp"
  return (
    <section className='space-y-10 '>
      <PageHeader  title="ARCHIVES: ABOUT"
      breadcrumb={['Home', 'About']}
      backgroundImage={background}/>

      <CoursesSection  />

      </section>
  )
}

export default AboutPage