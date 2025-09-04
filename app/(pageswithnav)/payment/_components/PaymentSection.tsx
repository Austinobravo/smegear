// app/payment/_components/PaymentSection.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

function apiBase() {
  // Prefer the current origin to keep cookies/session aligned.
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }
  // SSR fallback to env (works in production deploys)
  return (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
}

export default function PaymentCallbackSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("trxref");
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!reference) {
        setStatus("error");
        setMsg("Missing reference");
        return;
      }

      try {
        // 1) Get session/access token (like your Course create code)
        const session = await getSession();
        const accessToken = (session as any)?.accessToken as string | undefined;

        // 2) Build same-origin base to keep cookies valid
        const base = apiBase();

        // 3) Verify
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/paystack/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          credentials: "include", // send cookies if this is same-origin
          body: JSON.stringify({ reference }),
        });

        if (res.status === 401) {
          // Not signed in on this origin
          setStatus("error");
          setMsg("You need to sign in again to complete verification.");
          // Optional: auto-redirect to login, then back to this page
          setTimeout(() => {
            const returnTo = typeof window !== "undefined" ? window.location.href : "/payment/callback";
            router.push(`/auth/login?next=${encodeURIComponent(returnTo)}`);
          }, 1200);
          return;
        }

        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.message || "Verification failed");

        setStatus("success");
        setMsg("Payment verified! You are now enrolled and will be redirected.");
        setTimeout(() => router.push("/student"), 1200);
      } catch (e: any) {
        setStatus("error");
        setMsg(e.message || "Something went wrong");
      }
    };

    verify();
  }, [reference, router]);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Payment Status</h1>
      {status === "verifying" && <p>Verifying payment...</p>}
      {status === "success" && <p className="text-green-600">{msg}</p>}
      {status === "error" && <p className="text-red-600">{msg}</p>}
    </div>
  );
}
