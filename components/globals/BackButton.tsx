'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  fallbackHref?: string; // optional fallback route
  className?: string;    // allow custom styling
}

export function BackButton({
  label = 'Back',
  fallbackHref,
  className = '',
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackHref) {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center text-sm hover:opacity-75 transition ${className}`}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      {label}
    </button>
  );
}
