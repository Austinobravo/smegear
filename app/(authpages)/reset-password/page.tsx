'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Eye, EyeOff } from 'lucide-react';

const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'New password is required'),
    confirmNewPassword: z
      .string()
      .min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  

  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const passwordValue = watch('newPassword');

  useEffect(() => {
    if (!token) {
      setServerError('Missing or invalid token');
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordForm) => {
    console.log(data)
    const{newPassword,confirmNewPassword}=data
    if (!token) {
      toast.error('Missing token');
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        newPassword,
        confirmNewPassword
      });
      console.log('Reset Password Response:', response.data);
      

      setSuccessMessage(response.data.message || 'Password reset successful');

      toast.success('Password reset successful');
      setTimeout(() => router.push('/login'), 3000);
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        'Something went wrong';
      toast.error(errMsg);
      setServerError(errMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* New Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('newPassword')}
            className="w-full px-3 py-2 border rounded-md pr-10"
          />
          <span
            className="absolute top-9 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
          <PasswordStrengthBar password={passwordValue} className="mt-2" />
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmNewPassword')}
            className="w-full px-3 py-2 border rounded-md pr-10"
          />
          <span
            className="absolute top-9 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>
          )}
        </div>

        {/* Feedback */}
        {serverError && <p className="text-red-600 text-sm">{serverError}</p>}
        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

        <button
          type="submit"
          className="w-full bg-smegear-secondary text-white py-2 px-4 rounded-md hover:bg-smegear-accent transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
