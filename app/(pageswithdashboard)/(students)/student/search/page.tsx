import React, { Suspense } from 'react'
import CourseCards from './_components/courseSearch'

const SearchPage = () => {
  return (
     <Suspense fallback={<div className='text-center'>loading...</div>}>
        <CourseCards />
    </Suspense>
  )
}

export default SearchPage