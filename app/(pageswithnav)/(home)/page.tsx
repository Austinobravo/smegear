import React from 'react'
import HeroSection from './_components/Hero'
import CoursesCategories from './_components/CourseCategory'
import PopularCourses from './_components/PopularCourses'
import CommunityEngagement from './_components/Affiliate'
import TeamCarousel from './_components/TeamMembers'
import HowItWorks from './_components/HowItWorks'
import HeroCTASection from './_components/HeroCtaSection'
import TestimonialsCarousel from './_components/TestimonialSection'
import CoursesCarousel from './_components/PopularCourses2'
import LatestNewsHeader from './_components/LatestNewsHeader'

const HomePage = () => {
  return (
    <section className=''>
      <HeroSection />
      <CoursesCategories />
      <PopularCourses />
      <CommunityEngagement />
      <TeamCarousel />
      <HowItWorks />
      <HeroCTASection />
      <TestimonialsCarousel />
      <CoursesCarousel />
      <LatestNewsHeader/>
    </section>
  )
}

export default HomePage