import React, { Suspense } from 'react'
import VerifyEmailPage from './_components/VerifyEmailSection'

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  )
}

export default ResetPasswordPage