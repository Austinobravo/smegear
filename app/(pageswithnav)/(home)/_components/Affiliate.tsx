import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Wallet,
  Megaphone,
  CreditCard
} from "lucide-react";

const benefits = [
  {
    icon: <UserPlus className="w-14 h-14 text-primary" />, title: "Become a Co-owner"
  },
  {
    icon: <Wallet className="w-14 h-14 text-primary" />, title: "Become an Affiliate"
  },
  {
    icon: <Megaphone className="w-14 h-14 text-primary" />, title: "Access Free Marketing Content"
  },
  {
    icon: <CreditCard className="w-14 h-14 text-primary" />, title: "Access to Agent Portal"
  },
];

const stats = [
  { value: "2000+", label: "Successfully Trained" },
  { value: "50+", label: "Classes Completed" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "2000+", label: "Students Community" },
];

const CommunityEngagement = () => {
  return (
    <div className="bg-white py-10 px-4 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {benefits.map((item, i) => (
          <Card
            key={i}
            className="border-2 border-smegear-primary bg-[#f9f9ff] py-6 px-2 text-center rounded-xl "
          >
            <CardContent className="flex flex-col items-center gap-2">
             <div className="bg-smegear-secondary p-2 rounded-full flex justify-center items-center text-smegear-primary">
              {item.icon}
              </div> 
              <p className="text-[16.5px] font-semibold text-smegear-secondary text-center">
                {item.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
        {stats.map((stat, i) => (
          <div key={i} className="bg-smegear-secondary text-center py-6 rounded-xl">
            <div className="text-2xl md:text-5xl font-extrabold">{stat.value}</div>
            <div className="text-lg font-semibold mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityEngagement;
