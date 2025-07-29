"use client"
import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "sonner"
import { Loader2 } from 'lucide-react'
const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Invalid token");
      setLoading(false);
      return;
    }
    const verifyEmail = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`, { token })
        toast.success("Email verified successfully");
        router.push("/login");
      } catch (error) {
        toast.error("Verification failed. Token may have expired");

      } finally {
        setLoading(false)
      }
    }
    verifyEmail()
  }, [searchParams, router])
  return (
    <div className='flex items-center justify-center h-screen'>
      {loading ? (
        <div className='flex items-center gap-2'>
          <Loader2 className='animate-spin' />
          <p>Verifying email...</p>
        </div>
      ) : (<p className='text-center'>Verification complete.</p>)}

    </div>
  )
}

export default VerifyEmailPage