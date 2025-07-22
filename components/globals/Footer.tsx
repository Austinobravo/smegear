"use client";

import {
  Mail,
  Phone,
  MapPin,
  Youtube,
  Instagram,
  Facebook,
  Send,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const Links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const resources = [
    { name: "All Courses", href: "/courses" },
    { name: "Login", href: "/login" },
    { name: "Become a Student", href: "/register" }
  ]
  const contactInfo = [
    {
      icon: Phone,
      label: "Call us any time:",
      value: "+234 706327 6937",
      className: "",
    },
    {
      icon: Mail,
      label: "Email us 24/7 hours:",
      value: "Smegearhub@gmail.com",
      className: "",
    },
    {
      icon: MapPin,
      label: "Our address:",
      value: "10a, Unity Close, Union Estate, Oke Afa, Ejigbo",
      className: "lg:col-span-2",
    },
  ];
  return (
    <footer className="bg-smegear-secondary text-white pt-10  px-4">
      {/* Top contact info */}
      <div className="max-w-7xl mx-4 md:mx-auto flex flex-col md:items-center md:justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 border-b border-white/10 pb-6 mb-6 items-start">
          {contactInfo.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 justify-start md:justify-center ${item.className}`}
            >
              <item.icon className="text-white" size={24} />
              <div>
                <p className="text-[14px] font-normal">{item.label}</p>
                <strong className="text-[18px] font-semibold">{item.value}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Main footer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-white">
        {/* Branding */}
        <div>
          <div className="mb-4">
            <Image
              src="/logo.webp"
              alt="Scaling Ideas"
              width={150}
              height={40}
              className="object-contain"
            />
          </div>
          <p className=" text-gray-300  text-[16px] leading-[18px]">
            With years of experience in the legal and CAC registration domain,
            SmeGear is a trusted resource for individuals and
            entities seeking registration expertise.
          </p>
          <div className="mt-4 flex gap-3">
            <Youtube size={18} className="hover:text-gray-200 cursor-pointer" />
            <Instagram
              size={18}
              className="hover:text-gray-200 cursor-pointer"
            />
            <Facebook size={18} className="hover:text-gray-200 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-[20px] font-bold leading-[26px] mb-4">Quick Links</h4>
          <ul className="space-y-2 text-[16px] leading-[18px] text-gray-300">
            {Links.map((link, index) => (
              <li key={index} className="hover:text-smegear-accent cursor-pointer">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}

          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white text-[20px] font-bold leading-[26px] mb-4">Resources</h4>
          <ul className="space-y-2  text-gray-300 text-[16px] leading-[18px]">
            {resources.map((resource, index) => (

              <li key={index} className="hover:text-smegear-accent cursor-pointer">
                <a href={resource.href}>{resource.name}</a>
              </li>)

            )}

          </ul>
        </div>

        {/* Subscription */}
        <div>
          <h4 className="text-white text-[20px] font-bold leading-[26px] mb-4">Get in touch!</h4>
          <p className=" text-gray-300 mb-4 text-[16px] leading-[18px]">
            Subscribe to our newsletter to get our latest update & news
          </p>
          <div className="flex rounded-md overflow-hidden border border-white/20">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 text-black text-sm outline-none"
            />
            <button className="bg-smegear-accent px-3 flex items-center justify-center text-white">
              <Send size={16} />
            </button>
          </div>
          <button className="mt-4 w-full bg-smegear-accent text-white text-sm py-2 rounded hover:bg-[#4338ca] transition">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto text-center text-xs text-gray-400 mt-10 border-t border-white/10 pt-4">
        {/* <p>
          © {new Date().getFullYear()} SmeGear. All Rights
          Reserved. Developed by{" "}
          <span className="text-blue-400 hover:underline cursor-pointer">
            Megaweb Digital Solutions
          </span>
        </p> */}
      </div>
    </footer>
  );
}
