import PageHeader from "../../_components/Hero2"
import FilterCoursesPage from './_components/CourseList'

const CoursesPage = () => {
  const background="/hero2.webp"
  return (
    <section className='space-y-10 '>
      <PageHeader  title="ARCHIVES: COURSES"
      breadcrumb={['Home', 'Courses']}
      backgroundImage={background}/>

      <FilterCoursesPage />
    </section>

  )
}

export default CoursesPage