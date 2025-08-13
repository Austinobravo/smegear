import { IconBadge } from '@/components/icon-badge';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import LessonTitleForm from './_components/lesson-title-form';
import LessonDescriptionForm from './_components/lesson-description-form';
import ChapterAccessForm from './_components/lesson-access-form';
import Items from '@/Data/items';
import ChapterVideoForm from './_components/lesson-video-form';
import Banner from '@/components/banner';
import ChapterActions from './_components/lesson-actions';
interface PageProps {
  params: Promise<{ LessonsId: string }>;
}

const ChapterId = async ({ params }: PageProps) => {

  const chaptersId = (await params).LessonsId
  const category = Items.find((cat) => cat.id === chaptersId);

  const chapters = {
    title: false,
    description: true,
    video: true
  }
  const requiredFields = [
    chapters.title,
    chapters.description,
    chapters.video
  ]

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {!category?.isPublished && (<Banner variant="warning"
        label='This chapter is unpublished. It will not be visible in the course' />)}
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <div className='w-full'>
            <Link href={`/admin/courses/${chaptersId}`} className='flex items-center text-sm hover:opacity-75 mb-6 transition'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to course setup
            </Link>
            <div className='flex items-center justify-between w-full'>
              <div className='flex flex-col gap-y-2'>
                <h1 className='text-2xl font-medium'>
                  Lesson Creation
                </h1>
                <span className='text-sm text-slate-700'>
                  Complete all fields {completionText}
                </span>
              </div>
              {/* <ChapterActions disabled={!isComplete}
                chaptersId={chaptersId}
                checkPublished={category?.isPublished || false}
              /> */}

            </div>

          </div>

        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div className='space-y-4'>
            {/* Lesson creation */}
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={LayoutDashboard} />
                <h2 className='text-xl'>
                  Customize your lesson
                </h2>

              </div>
              <LessonTitleForm
                chaptersId={chaptersId}
              />
              <LessonDescriptionForm chaptersId={chaptersId} />
            </div>

           


            {/* Access settings */}
            {/* <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  Access Settings
                </h2>
              </div>
              <ChapterAccessForm
                chaptersId={chaptersId}
              
              />
            </div> */}
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <ChapterVideoForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChapterId