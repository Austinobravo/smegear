import { Book, CandlestickChart, FileImage, Mail } from 'lucide-react'
import React from 'react'

const services = [
    {
        icon: <Book/>,
        title: 'CAC Registration',
        description: 'Building a trust between you and your clients by having your business registered under the right authorities.'
    },
    {
        icon: <CandlestickChart/>,
        title: 'Software Development',
        description: 'We deal with creation of software for various companies and startups. Having a websites makes your brand stand out of the majority! Let’s bring you an online presence. '
    },
    
    {
        icon: <FileImage/>,
        title: 'Branding',
        description: 'TechPro Innovation creates  a strong, positive perception of a company, its products or services in the customer’s mind through branding & design for the company.'
    },
    {
        icon: <Book/>,
        title: 'Social Media Marketing',
        description: 'Developing and executing data-driven social media strategies to engage clients and drive awareness and conversion.'
    },
    {
        icon: <Mail/>,
        title: 'Email Marketing',
        description: 'Designing and implementing strategic email campaigns to nuture leads.'
    },
    {
        icon: <CandlestickChart/>,
        title: 'Digital Marketing',
        description: 'The goal of this approach is to connect with customers online (the place where they spend the most time seeking information or entertainment).'
    },
   
]

const Services = () => {
  return (
    <section className='bg-white md:px-12 px-6 py-10'>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-5'>
            {services.map((service, index)=> (
                <div key={index} className='flex space-x-4'>
                    <div className='bg-amber-500 text-white h-fit w-fit rounded-full p-2'>
                        {service.icon}
                    </div>
                    <div className='space-y-5'>
                        <h3 className='font-bold'>{service.title}</h3>
                        <p className='opacity-80'>{service.description}</p>
                    </div>
                </div>
            ))}

        </div>

      
    </section>
  )
}

export default Services
