'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [scrollY, setScrollY] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;

      setScrollY(progress);
      setShow(scrolled > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={scrollToTop}
        className="relative cursor-pointer w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group"
      >
        {/* Circular progress */}
        <svg className="absolute top-0 left-0 w-full h-full transform rotate-[-90deg]" viewBox="0 0 36 36">
          <path
            className="text-gray-300"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-smegear-secondary"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${scrollY}, 100`}
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        <ArrowUp className="w-5 h-5 text-smegear-secondary z-10" />
      </div>
    </div>
  );
}
