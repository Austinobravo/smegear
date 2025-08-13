import React, { Suspense } from 'react'
import ResetPasswordFormSection from './_components/ResetPasswordForm'

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordFormSection />
    </Suspense>
  )
}

export default ResetPasswordPage