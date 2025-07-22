import PageHeader from '@/app/(pageswithnav)/_components/Hero2'
import React from 'react'
import LoginForm from './_components/LoginForm'
import Link from 'next/link'

const SignIn = () => {
  const background = "/hero2.webp"
  return (
    <section className='space-y-5 mb-5'>
      <PageHeader title="DASHBOARD"
        breadcrumb={['Home', 'Dashboard']}
        backgroundImage={background} />

      <LoginForm />

    </section>
  )
}

export default SignIn