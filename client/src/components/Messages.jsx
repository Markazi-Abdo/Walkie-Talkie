import React, { useEffect, useRef } from 'react'
import { timeFormatter } from '../lib/time'

export default function Messages({ messages, selectedUser, currentUser }) { 
  const msgRef = useRef(null);
  
  useEffect(() => {
    if(msgRef.current && messages) {
        msgRef.current.scrollIntoView({ behavior : "smooth"})
    }
  }, [messages])

  useRef
  return (
    <div className='bg-primary/50 overflow-y-scroll'>
        {
            messages.map((message )=> (
                <div key={message._id} ref={msgRef}>
                    {
                        message.senderId !== selectedUser._id ? (
                                <div className='chat chat-end'>
                                    <div className='chat-image avatar'>
                                        <div className='w-10 rounded-full'>
                                            <img src={currentUser?.profilePic} alt={currentUser?.username} />
                                        </div>
                                    </div>
                                    <div className='chat-header'>
                                        <p className='font-thin text-sm'>{currentUser.username}</p>
                                    </div>
                                    <div className='chat-bubble'>
                                        {
                                            message.image && (
                                                <img 
                                                src={message.image || "Attachement"} 
                                                alt="Attachement"
                                                className=''
                                                />
                                            )
                                        }
                                        <p>{message.text}</p>
                                    </div>
                                    <div className='chat-footer'>
                                        <time>{timeFormatter(message.createdAt)}</time>
                                    </div>
                                </div>
                            ) : (
                               <div>
                                    <div className='chat chat-start'>
                                    <div className='chat-image avatar'>
                                        <div className='w-10 rounded-full'>
                                            <img src={selectedUser?.profilePic || "/vite.svg"} alt={selectedUser?.username} />
                                        </div>
                                    </div>
                                        <div className='chat-bubble-success'>{message.text}</div>
                                    </div>
                               </div>
                            )
                    }
                </div>
            ))
        }
    </div>
  )
}
