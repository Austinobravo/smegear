import React from 'react'
import CourseCards from './_components/CourseCards'
import RecommendedCourses from './_components/RecommendedCourses'
import axios from 'axios'
import { cookies } from 'next/headers'

const fetchAllCourses = async () => {
  try{
      const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("No access token found");
    }
    console.log("token", token)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
    console.log("all courses", response.data)
    return response.data

  }catch(error){
    console.error("error", error)
    return []
  }
 
}
const page = async () => {
  const allCourses = await fetchAllCourses()
  return (
    <section className=' space-y-6'>
      <CourseCards />
      <RecommendedCourses />
    </section>
  )
}

export default page