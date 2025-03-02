import React from 'react'

export default function AuthDesign({ title, description }) {
  return (
    <div className='hidden lg:flex items-center justify-center  h-full p-12'>
        <div className='max-w-md text-center'>
            <div className='grid grid-cols-3 gap-3 mb-8'>
                {
                    [...Array(9)].map((_, i) => (
                        <div 
                        key={i}
                        className={`aspect-square rounded-2xl bg-primary/10 ${ i % 2 ? 'animate-pulse' : "" }`}
                        >  
                        </div>
                    ))
                }
            </div>
            <h2 className='text-2xl font-bold mb-4'>{title}</h2>
            <p className='font-thin'>{description}</p>
        </div>
    </div>
  )
}
