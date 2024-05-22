'use client'
import Image from 'next/image'
import React from 'react'
const TeamMember = [
    {
        image: '/emma.jpg',
        name: 'Emmanuel',
        designation: 'Director'
    },
    {
        image: '/frank.jpg',
        name: 'Frank',
        designation: 'Manager'
    },
    {
        image: '/goodness.jpg',
        name: 'Goodness',
        designation: 'Executive Assistant'
    },
    {
        image: '/napi.jpg',
        name: 'Nagapiya',
        designation: 'Branding Manager'
    },
    {
        image: '/ebuka.jpg',
        name: 'Ebuka',
        designation: 'Software Developer'
    },
    {
        image: '/israel_graphics.jpg',
        name: 'Israel',
        designation: 'Graphics Designer'
    },
    
    
]
const Team = () => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false)
    const [currentTeamMember, setCurrentTeamMember] = React.useState<number| null>(null)
  return (
    <div id='team' className='py-10 md:px-12 px-6 snap-center' >
            <div className='flex flex-wrap w-full md:justify-start justify-center gap-10'>
                {TeamMember.map((teamMember, index) => (
                    <div key={index} className={`${isHovered && currentTeamMember === index && 'scale-105'} relative h-60`} onMouseEnter={()=>{setIsHovered(true), setCurrentTeamMember(index)}} onMouseLeave={()=>{setIsHovered(false), setCurrentTeamMember(null)}}>
                        <Image src={teamMember.image} width={200} height={100} alt={teamMember.name} className={`${isHovered && currentTeamMember === index && 'scale-105'} rounded-md object-cover h-60 w-60 object-top`} />
                        {isHovered && currentTeamMember === index && 
                            <div className={`${isHovered && currentTeamMember === index && 'scale-105'} bg-black/50 top-0 left-0 absolute w-full h-60 text-white cursor-pointer rounded-md`}>
                                <div className='bottom-5 absolute text-center w-full'>
                                    <p className='text-xl font-bold'>{teamMember.name}</p> 
                                    <p className='text-xs font-semibold italic text-amber-500'>{teamMember.designation}</p> 
                                </div>
                            </div>
                        }
                    </div>
                ))}

            </div>
        </div>
  )
}

export default Team
