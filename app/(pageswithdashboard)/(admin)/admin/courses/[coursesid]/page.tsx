import React from 'react'
import { IconBadge } from '@/components/icon-badge'
import { LayoutDashboard } from 'lucide-react'
import TitleForm from './_components/title-form'
import { title } from 'process'
const AdminCoursesPage = () => {
  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>
            Course setup
          </h1>
          <span>
            Complete all fields (1/5)
          </span>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h1 className='text-xl'>Customize your course</h1>
          </div>
          <TitleForm
         

          />
        </div>

      </div>
    </div>
  )
}

export default AdminCoursesPage