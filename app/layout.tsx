import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local"
import "./globals.css";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import ScrollToTop from "@/components/globals/ScrollToTop";
import Navbar from "@/components/Navbar";
const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Regular.otf'
    },
    {
      path: './fonts/Satoshi-Bold.otf'
    },
    {
      path: './fonts/Satoshi-Light.otf'
    },
    {
      path: './fonts/Satoshi-Black.otf'
    },
    {
      path: './fonts/Satoshi-Medium.otf'
    },

  ]
})

export const metadata: Metadata = {
  title: "SmeGear - A Digital Agency",
  description: "SmeGear - A Digital Agency",
  verification:{
    google: 'X0phLt90DZ0hKaDH3WyYbfbXJhuq7I3CDlR62i8RjJs'
  }
};
// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-XGG153E7VN"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-XGG153E7VN');
// </script>
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} 
       scroll-smooth`}>
        <div className="md:pt-[72px] pb-[70px]">

        {children}
        </div>
         <ScrollToTop />
        <WhatsAppIcon/></body>
      <GoogleAnalytics gaId="G-XGG153E7VN"/>
    </html>
  );
}
