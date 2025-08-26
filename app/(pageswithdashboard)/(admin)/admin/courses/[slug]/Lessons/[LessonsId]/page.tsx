import { IconBadge } from '@/components/icon-badge';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import React from 'react'
import LessonTitleForm from './_components/lesson-title-form';
import LessonDescriptionForm from './_components/lesson-description-form';
import ChapterVideoForm from './_components/lesson-video-form';
import { notFound } from 'next/navigation';
import { fetchAllCoursesBySession } from '@/lib/fetchAllCourses';
import { BackButton } from '@/components/globals/BackButton';


interface PageProps {
  params: { LessonsId: string };
}

async function fetchLessonById(LessonsId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${encodeURIComponent(LessonsId)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch lesson by id:", e);
    return null;
  }
}

const ChapterId = async ({ params }: PageProps) => {
  const res = await fetchAllCoursesBySession()
  console.log("fetchAllCoursesBySession", res)

  const chaptersId = (await params).LessonsId
  const { LessonsId } = params;
  const lesson = await fetchLessonById(LessonsId);
  console.log("Fetched Lesson:", lesson);
  if (!lesson) return notFound();
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
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <div className='w-full'>
            <BackButton />
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
                lesson={lesson}
              />
              <LessonDescriptionForm lesson={lesson} />
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
            <ChapterVideoForm lesson={lesson} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChapterId
