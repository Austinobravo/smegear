import Footer from '@/components/globals/Footer'
import Navbar from '@/components/globals/Navbar'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>
const PagesWithNavLayout = ({children}: Props) => {
  return (
    <section>
        <Navbar />
        <div>
            {children}
        </div>
        <Footer />
    </section>
  )
}

export default PagesWithNavLayout