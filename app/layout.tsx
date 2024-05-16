import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} bg-gray-200`}>{children}</body>
    </html>
  );
}
