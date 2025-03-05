import React, {useEffect} from 'react'
import { WalkieTalkieChatStore } from '../store/ChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessagesSkeleton from './skeletons/MessagesSkeleton';
import Messages from './Messages';
import { walkieTalkieAuthStore } from '../store/AuthStore';

export default function ChatContainer() {
  const { getMessages, messages, isMesssagesLoading, selectedUser, setSelectedUser, listenToMessages } = WalkieTalkieChatStore();
  const { authUser } = walkieTalkieAuthStore();
  console.log(authUser)
  useEffect(()=>{
    getMessages(selectedUser._id);
    listenToMessages();
  }, [ selectedUser._id, getMessages, listenToMessages ]);

  console.log(messages);

  if(isMesssagesLoading) return (
    <div className='w-full flex flex-1 flex-col'>
      <ChatHeader username={selectedUser?.username} profilePic={selectedUser?.profilePic || "/vite.svg"} setUser={setSelectedUser}/>
      <MessagesSkeleton />
      <MessageInput />
    </div>
  );

  return (
    <div className='w-full flex flex-1 flex-col'>
      <ChatHeader username={selectedUser?.username} profilePic={selectedUser?.profilePic || "/vite.svg"} setUser={setSelectedUser}/>
      <div className='w-full h-[570px] overflow-y-scroll '>
        <Messages messages={messages} currentUser={authUser.userData} selectedUser={selectedUser}/>
      </div>
      <div className=''>
        <MessageInput />
      </div>
    </div>
  )
}
