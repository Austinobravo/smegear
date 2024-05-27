import Image from 'next/image'
import React from 'react'

const Contact = () => {
  return (
    <div id='contact' className='flex md:px-12 px-6 flex-wrap md:flex-nowrap gap-10 py-10 bg-white'>
        <div className='md:basis-1/2 w-full border border-gray-900 rounded-md'>
            <Image src={`/contact.jpg`} width={500} height={200} alt='Contact Us' className='rounded-md flex-1 w-full h-full'/>
        </div>
        <div className='md:basis-1/2 w-full'>
            <form>
                <fieldset className='space-y-2'>
                    <legend className='text-xs uppercase font-bold'>Contact Us</legend>
                    <div>
                        <label htmlFor='name'></label>
                        <input type='text' name='name' id='name' placeholder='Please we will need your name' className='w-full py-2 px-4 rounded-sm focus:outline-blue-900 border-2'/>
                    </div>
                    <div>
                        <label htmlFor='subject'></label>
                        <input type='text' name='subject' id='subject' placeholder="What's the title of reaching us?" className='w-full py-2 px-4 rounded-sm focus:outline-blue-900 border-2'/>
                    </div>
                    <div>
                        <label htmlFor='message'></label>
                        <textarea name='message' id='message' cols={10} rows={7} placeholder='How can we help you?' className='w-full py-2 px-4 rounded-sm focus:outline-blue-900 border-2'/>
                    </div>
                    <div className='bg-black rounded-sm py-2 px-3 text-white text-center'>
                        <button type='submit' >Send Us A Message</button>
                    </div>
                </fieldset>
            </form>
        </div>
      
    </div>
  )
}

export default Contact
