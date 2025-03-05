import { X } from 'lucide-react'
import React from 'react'

export default function ChatHeader({username , profilePic, setUser}) {
  return (
    <div className='border-b-2 border-primary p-5 w-full flex justify-between items-center'>
        <div className='flex justify-between items-center w-full gap-2'>
            <img 
            src={profilePic} 
            alt={username} 
            className='size-10 border border-secondary rounded-full object-fill'
            />
            <h2 className='font-bold text-xl w-full'>{username}</h2>
        </div>
        <button onClick={()=>setUser(null)}>
            <X className="size-10"/>
        </button>
    </div>
  )
}
