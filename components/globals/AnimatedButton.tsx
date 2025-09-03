'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

type AnimatedButtonProps = {
  /** Button text or JSX */
  children: ReactNode;
  /** URL to navigate to (optional, if used as link) */
  href?: string;
  /** Variant styles */
  variant?: 'primary' | 'secondary';
  /** Additional tailwind classes */
  className?: string;
  /** Whether to use a real button instead of a link */
  as?: 'button' | 'link';
} & Omit<ComponentProps<'button'>, 'children'> &
  Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>;

export default function AnimatedButton({
  children,
  href,
  variant = 'primary',
  className,
  as = 'link',
  ...rest
}: AnimatedButtonProps) {
  const reduce = useReducedMotion();

  // base style sets
  const base =
    'group relative inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const variants: Record<'primary' | 'secondary', string> = {
    primary:
      'bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.45)] focus-visible:ring-indigo-400/70',
    secondary:
      'bg-gradient-to-b from-zinc-800 to-zinc-900 text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45)] focus-visible:ring-zinc-400/70',
  };

  // subtle idle float + shimmer
  const floatAnim = reduce
    ? {}
    : {
        y: [0, -1.5, 0],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
      };

  const shimmerAnim = reduce
    ? {}
    : {
        x: ['-150%', '150%'],
        transition: { duration: 2.2, repeat: Infinity, ease: 'linear' as const },
      };

  const Content = (
    <>
      {/* glow halo */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-xl blur-xl opacity-60 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.65),transparent_60%)] transition-opacity duration-300 group-hover:opacity-80"
      />

      {/* main surface */}
      <motion.span
        initial={false}
        animate={floatAnim}
        whileHover={{ y: -2, boxShadow: '0 14px 28px -12px rgba(79,70,229,0.65)' }}
        whileTap={{ scale: 0.985 }}
        className="relative z-10 inline-flex items-center gap-2"
      >
        <span className="whitespace-nowrap">{children}</span>
        {/* arrow */}
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
          initial={false}
          whileHover={{ x: 3 }}
          whileTap={{ x: 1 }}
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </motion.svg>
      </motion.span>

      {/* shimmer */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
        initial={false}
        animate={shimmerAnim}
      >
        <span className="absolute top-0 h-full w-1/3 -skew-x-12 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent" />
      </motion.span>
    </>
  );

  if (as === 'button') {
    return (
      <button
        type="button"
        className={`${base} ${variants[variant]} ${className ?? ''}`}
        {...(rest as ComponentProps<'button'>)}
      >
        {Content}
      </button>
    );
  }

  return (
    <Link
      href={href ?? '#'}
      className={`${base} ${variants[variant]} ${className ?? ''}`}
      {...(rest as Omit<ComponentProps<typeof Link>, 'href'>)}
    >
      {Content}
    </Link>
  );
}
