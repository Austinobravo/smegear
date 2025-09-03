// components/payments/PaystackBuyButton.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { getSession, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ModalLoginForm from "@/components/globals/ModalLoginForm";

type Props = {
  courseId: string | number;
  className?: string;
};

// Always use production base, with safe fallback
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://smegear.vercel.app").replace(
  /\/+$/,
  ""
);

export default function PaystackBuyButton({ courseId, className }: Props) {
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onBuy = async () => {
    setError(null);
    setLoading(true);

    try {
      // 1) Get the logged-in user/session
      const user = await getSession();
      const accessToken = (user as any)?.accessToken;

      // If not logged in, open login modal
      if (!accessToken) {
        setShowLogin(true);
        return;
      }

      // 2) Call production init endpoint with Bearer token (and cookies)
      const res = await axios.post(
        `${API_BASE}/api/payments/paystack/init`,
        { courseId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true, // send cookies too (if your API also reads session cookies)
        }
      );

      const { authorization_url } = res.data || {};
      if (!authorization_url) {
        throw new Error("Unable to start payment");
      }

      // 3) Redirect to Paystack checkout
      window.location.assign(authorization_url as string);
    } catch (e: any) {
      // Axios-friendly error handling
      const status = e?.response?.status;
      const message = e?.response?.data?.message || e.message || "Something went wrong";

      if (status === 401) {
        setShowLogin(true);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={onBuy}
        disabled={loading}
        className={
          className ??
          "w-full py-8 font-bold bg-smegear-secondary text-white text-lg"
        }
      >
        {loading ? "Redirecting…" : "Buy Now"}
      </Button>

      {error ? (
        <p className="text-red-600 text-sm mt-2" role="alert">
          {error}
        </p>
      ) : null}

      {/* Login modal shows if not authenticated */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogTrigger asChild>
          <span className="hidden" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="w-full overflow-hidden p-5">
            <ModalLoginForm />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
