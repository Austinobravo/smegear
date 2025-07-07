import React from 'react'
import HeroSection from './_components/Hero'
import CoursesCategories from './_components/CourseCategory'
import PopularCourses from './_components/PopularCourses'
import CommunityEngagement from './_components/Affiliate'

const HomePage = () => {
  return (
    <section className='space-y-10'>
      <HeroSection/>
      <CoursesCategories/>
      <PopularCourses/>
      <CommunityEngagement/>
    </section>
  )
}

export default HomePage