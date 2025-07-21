"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Wallet,
  Megaphone,
  CreditCard
} from "lucide-react";
import { useEffect, useRef, useState } from 'react'

const benefits = [
  {
    icon: <UserPlus className="w-14 h-14 text-primary text-white" />, title: "Become a Co-owner"
  },
  {
    icon: <Wallet className="w-14 h-14 text-primary text-white" />, title: "Become an Affiliate"
  },
  {
    icon: <Megaphone className="w-14 h-14 text-primary text-white" />, title: "Access Free Marketing Content"
  },
  {
    icon: <CreditCard className="w-14 h-14 text-primary text-white" />, title: "Access to Agent Portal"
  },
];

// const stats = [
//   { value: "2000+", label: "Successfully Trained" },
//   { value: "50+", label: "Classes Completed" },
//   { value: "100%", label: "Satisfaction Rate" },
//   { value: "2000+", label: "Students Community" },
// ];

type Stat = {
  value: number
  label: string
}

const stats: Stat[] = [
  { value: 1200, label: 'Students' },
  { value: 75, label: 'Courses' },
  { value: 30, label: 'Instructors' },
  { value: 95, label: 'Success Rate (%)' },
]

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const start = useRef<DOMHighResTimeStamp | null>(null)

  useEffect(() => {
    const step = (timestamp: DOMHighResTimeStamp) => {
      if (!start.current) start.current = timestamp
      const progress = timestamp - start.current
      const progressRatio = Math.min(progress / duration, 1)
      const value = Math.floor(progressRatio * end)
      setCount(value)

      if (progress < duration) {
        requestAnimationFrame(step)
      } else {
        setCount(end) // ensure it finishes at the exact value
      }
    }

    requestAnimationFrame(step)
  }, [end, duration])

  return count
}

const CommunityEngagement = () => {
  return (
    <div className="bg-[#FEFFFE] py-10 px-4 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {benefits.map((item, i) => (
          <Card
            key={i}
            className="border-2 border-smegear-primary bg-[#f9f9ff] py-6  text-center rounded-xl "
          >
            <CardContent className="flex flex-col items-center gap-2">
              <div className="bg-smegear-secondary p-2 rounded-full flex justify-center items-center text-smegear-primary">
                {item.icon}
              </div>
              <p className="text-[17px] font-semibold text-smegear-secondary text-center">
                {item.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
        {stats.map((stat, i) => {
          const count = useCountUp(stat.value, 2000)
          return (
            <div key={i} className="bg-smegear-secondary text-center py-6 rounded-xl">
              <div className="text-2xl md:text-5xl font-extrabold">{count.toLocaleString()}</div>
              <div className="text-lg font-semibold mt-1">{stat.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default CommunityEngagement;
