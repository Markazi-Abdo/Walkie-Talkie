import React from 'react'

export default function MessagesSkeleton() {
  return (
    <div className='flex-1 mt-10'>
        <div className='chat chat-start'>
            <div className='chat-bubble skeleton h-15 w-25 text-center'>
                Loading...
            </div>
        </div>
        <div className='chat chat-end'>
            <div className='chat-bubble skeleton h-15 w-25 text-center'>
                Loading...
            </div>
        </div>
    </div>
  )
}
