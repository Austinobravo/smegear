import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import { ChevronRight } from "lucide-react"
import Link from 'next/link'
import WaitlistForm from '@/app/(pageswithnav)/(home)/_components/WaitlistForm'

const Waitlist = () => {
  return (
    <div>
      <section className=''>
      <div className='bg-[#F7F6F6] flex lg:flex-nowrap flex-wrap items-center gap-10 px-7 pt-7'>
        <div className='lg:basis-1/2 lg:pl-16 space-y-7 text-center lg:text-start'>
            <h2 className='font-extrabold lg:text-6xl text-4xl leading-[117%]'>Matchmaking Tech Talent With Opportunity through AI-Driven Precision.</h2>
            <p className='font-semibold text-xl'>Explore over 14,855 job listings! The efficient, lightning fast solution for discovering and hiring top talent.</p>
            <div className='lg:flex hidden'>
              <Card className='shadow-none bg-talentpro-brown text-white w-72 h-52 rounded-3xl'>
                    <CardHeader className=''>
                            <CardTitle className=' pt-2 flex justify-between gap-12'>
                              <h3 className='text-2xl font-bold'>FOR <br/> EMPLOYERS</h3>
                              <Link href={``} className='!bg-white size-6 rounded-full'><ChevronRight className='rotate-[340deg] text-talentpro-brown'/></Link>
                          </CardTitle>
                      
                    </CardHeader>
                    <CardContent className='text-xs'>
                      Access over 14,855 candidates! The seamless, lightning-fast way to find and hire exceptional talent.
                    </CardContent>
                </Card>
              <Card className='shadow-none bg-[#FAF2E7] w-72 h-52 rounded-3xl -ml-4'>
                    <CardHeader className=''>
                        
                            <CardTitle className=' pt-2 flex justify-between gap-12'>
                              <h3  className='text-2xl font-bold'>FOR <br/> TALENT</h3>
                              <Link href={``} className='!bg-black size-6 rounded-full'><ChevronRight className='rotate-[340deg] text-white'/></Link>

                              
                            </CardTitle>
                      
                    </CardHeader>
                    <CardContent className='text-xs'>
                    Discover over 10,250 opportunities! The fastest, most reliable way to connect with your dream job
                    </CardContent>
                </Card>

            </div>

        </div>
        <div className='lg:basis-1/2 lg:pr-12 lg:justify-end flex overflow-hidden w-fit mx-auto'>
            <Image src={`/hero_image.png`} width={500} height={200} alt='Hero Image' className=''/>
        </div>

      </div>
        <div className='overflow-x-scroll pl-3 no-scrollbar'>
          <div className='flex lg:hidden'>
                <Card className='shadow-none bg-talentpro-brown text-white w-72 h-52 rounded-3xl'>
                      <CardHeader className=''>
                              <CardTitle className=' pt-2 flex justify-between gap-12'>
                                <h3 className='text-2xl font-bold'>FOR <br/> EMPLOYERS</h3>
                                <Link href={``} className='!bg-white size-6 rounded-full'><ChevronRight className='rotate-[340deg] text-talentpro-brown'/></Link>
                            </CardTitle>
                        
                      </CardHeader>
                      <CardContent className='text-xs'>
                        Access over 14,855 candidates! The seamless, lightning-fast way to find and hire exceptional talent.
                      </CardContent>
                  </Card>
                <Card className='shadow-none bg-[#FAF2E7] w-72 h-52 rounded-3xl -ml-4'>
                      <CardHeader className=''>
                          
                              <CardTitle className=' pt-2 flex justify-between gap-12'>
                                <h3  className='text-2xl font-bold'>FOR <br/> TALENT</h3>
                                <Link href={``} className='!bg-black size-6 rounded-full'><ChevronRight className='rotate-[340deg] text-white'/></Link>

                                
                              </CardTitle>
                        
                      </CardHeader>
                      <CardContent className='text-xs'>
                      Discover over 10,250 opportunities! The fastest, most reliable way to connect with your dream job
                      </CardContent>
                  </Card>

          </div>

        </div>

      
    </section>
    <WaitlistForm />
    
    </div>
  )
}

export default Waitlist
