import React, { Suspense } from 'react'
import PaymentCallbackSection from './_components/PaymentSection'

const PaymentCallbackPage = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
        <PaymentCallbackSection />
    </Suspense>
  )
}

export default PaymentCallbackPage