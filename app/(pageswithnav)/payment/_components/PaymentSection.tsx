"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentCallbackSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const verify = async () => {
      if (!reference) {
        setStatus("error");
        setMsg("Missing reference");
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/paystack/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Verification failed");
        setStatus("success");
        setMsg("Payment verified! You are now enrolled and will be redirected now.");
        
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
