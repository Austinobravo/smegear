import React from 'react'
import PageHeader from '@/app/(pageswithnav)/_components/Hero2'
import RegistrationForm from './_components/SignUpForm'

const SignUp = () => {
  const background = "/hero2.webp"
  return (
    <section className='space-y-10 '>
      <PageHeader title="DASHBOARD"
        breadcrumb={['Home', 'Dashboard']}
        backgroundImage={background} />
      <RegistrationForm />

    </section>
  )
}

export default SignUp