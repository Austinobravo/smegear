import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const CoursesPage = () => {
  return (
    <div><Link href="/admin/create">
      <Button>New Course</Button>
    </Link>
    </div>
  )
}

export default CoursesPage