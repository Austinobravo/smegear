import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local"
import "./globals.css";
import WhatsAppIcon from "@/components/globals/WhatsAppIcon";
import ScrollToTop from "@/components/globals/ScrollToTop";
import { Toaster } from "@/components/ui/sonner"
// import Navbar from "@/components/Navbar";
import { Jost } from 'next/font/google';

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
    

  ],
   variable: "--font-satoshi", 
    display: "swap",
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: "SmeGear - A Digital Agency",
  description: "SmeGear - A Digital Agency",
  verification: {
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
    <html lang="en" >
      <body className={`${satoshi.className} 
       scroll-smooth`}>
        <Toaster
          richColors
          toastOptions={{
            classNames: {
              success: 'bg-green-50 text-green-800 border border-green-300',
              error: 'bg-red-50 text-red-800 border border-red-300',
              info: 'bg-blue-50 text-blue-800 border border-blue-300',
              warning: 'bg-yellow-50 text-yellow-800 border border-yellow-300',
              default: 'bg-gray-50 text-gray-800 border border-gray-300',
            },
          }}
        />


        {children}
        <ScrollToTop />
        <WhatsAppIcon />
      </body>

      <GoogleAnalytics gaId="G-XGG153E7VN" />
    </html>
  );
}
