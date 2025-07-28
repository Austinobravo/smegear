import PageHeader from '@/app/(pageswithnav)/_components/Hero2'
import React from 'react'
import ForgottenPassword from './_components/ForgetPassword'
import { de } from 'zod/v4/locales'


const page = () => {
 const background = "/hero2.webp"
  return (
    <section className='space-y-5 mb-5'>
      <PageHeader title="DASHBOARD"
        breadcrumb={['Home', 'Dashboard']}
        backgroundImage={background} />

      <ForgottenPassword/>

    </section>
  )
}
export default page