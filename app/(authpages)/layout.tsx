import Footer from '@/components/globals/Footer'
import Navbar from '@/components/globals/Navbar'
import ScrollToTop from '@/components/globals/ScrollToTop'
import WhatsAppIcon from '@/components/globals/WhatsAppIcon'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>
const PagesWithNavLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`
          scroll-smooth`}>
        <Navbar />
        <div className="md:pt-[72px] ">

          {children}
        </div>
        <ScrollToTop />
        <WhatsAppIcon />
        <Footer/>
        </body>

    </html>
  )
}

export default PagesWithNavLayout