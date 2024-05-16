'use client'
import Image from 'next/image'
import React from 'react'
const TeamMember = [
    {
        image: '/emma.jpg',
        name: 'Emmanuel Nwaimo',
        designation: 'Director'
    },
    {
        image: '/emma.jpg',
        name: 'Emmanuel Nwaimo',
        designation: 'Director'
    },
    {
        image: '/emma.jpg',
        name: 'Emmanuel Nwaimo',
        designation: 'Director'
    },
    {
        image: '/emma.jpg',
        name: 'Emmanuel Nwaimo',
        designation: 'Director'
    },
    {
        image: '/emma.jpg',
        name: 'Emmanuel Nwaimo',
        designation: 'Director'
    },
    
    
]
const Team = () => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false)
    const [currentTeamMember, setCurrentTeamMember] = React.useState<number| null>(null)
  return (
    <div id='team' className='py-10' >
            <div className='flex flex-wrap items-center justify-center gap-10'>
                {TeamMember.map((teamMember, index) => (
                    <div key={index} className='relative ' onMouseEnter={()=>{setIsHovered(true), setCurrentTeamMember(index)}} onMouseLeave={()=>{setIsHovered(false), setCurrentTeamMember(null)}}>
                        <Image src={teamMember.image} width={200} height={100}alt={teamMember.name} className={`${isHovered && currentTeamMember === index && 'scale-105'} rounded-md `} />
                        {isHovered && currentTeamMember === index && 
                            <div className='bg-black/50 top-0 left-0 absolute w-full h-full text-white cursor-pointer '>
                                <div className='bottom-0 absolute text-center w-full'>
                                    <p className='text-xl font-bold'>{teamMember.name}</p> 
                                    <p className='text-sm font-semibold'>{teamMember.designation}</p> 
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
