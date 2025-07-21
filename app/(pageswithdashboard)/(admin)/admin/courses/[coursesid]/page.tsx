import React from 'react'
import { IconBadge } from '@/components/icon-badge'
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react'
import TitleForm from './_components/title-form'

import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'
import CategoryForm from './_components/category-form'
import PriceForm from './_components/price-form'
import AttachmentForm from './_components/attachment-form'
const AdminCoursesPage = () => {

  // Map categories to match the expected shape for CategoryForm

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
          <DescriptionForm


          />
          <ImageForm


          />
          <CategoryForm


          />
        </div>
        <div className='space-y-6'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ListChecks} />
              <h2 className='text-xl'>
                Course chapters
              </h2>
            </div>
            <div>
              TODO:Chapters
            </div>
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={CircleDollarSign} />
              <h2 className='text-xl'>
                Sell your course
              </h2>

            </div>
            <PriceForm />
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={File} />
              <h2 className='text-xl'>
                Resource & Attachments
              </h2>
            </div>
            <AttachmentForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCoursesPage