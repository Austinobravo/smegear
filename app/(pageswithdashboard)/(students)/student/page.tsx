import React from 'react'
import CourseCards from './_components/CourseCards'
import RecommendedCourses from './_components/RecommendedCourses'

const page = () => {
  return (
    <section className=' space-y-6'>
      <CourseCards />
      <RecommendedCourses />
    </section>
  )
}

export default page