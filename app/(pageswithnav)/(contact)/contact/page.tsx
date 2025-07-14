import React from 'react'
import PageHeader from '../../_components/Hero2'
import { Contact } from 'lucide-react'
import ContactForm from '../_components/ContactForm'

const ContactPage = () => {
   const background="/hero2.webp"
  return (
     <section className='space-y-10 '>
      <PageHeader  title="CONTACT US"
      breadcrumb={['Home', 'Contact']}
      backgroundImage={background}/>
      <ContactForm/>
      

      </section>
  )
}

export default ContactPage