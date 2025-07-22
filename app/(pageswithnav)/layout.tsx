import Footer from '@/components/globals/Footer'
import Navbar from '@/components/globals/Navbar'
import ScrollToTop from '@/components/globals/ScrollToTop'
import WhatsAppIcon from '@/components/globals/WhatsAppIcon'
import React from 'react'


const PagesWithNavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`
          scroll-smooth`}>
        <Navbar />
        <div className="md:pt-[72px] pb-[50px]">

          {children}
        </div>
       
        <Footer/>
        </body>

    </html>
  )
}

export default PagesWithNavLayout