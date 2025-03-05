import React from 'react'
import { WalkieTalkieChatStore } from '../store/ChatStore'
import SideBar from '../components/SideBar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

export default function Home() {
  const { selectedUser } = WalkieTalkieChatStore(); 

  return (
    <div className='bg-base-300'>
      <div className='flex items-center justify center pt-15'>
        <div className='bg-base-200/50 flex w-full h-[750px]'>
          <SideBar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  )
}
