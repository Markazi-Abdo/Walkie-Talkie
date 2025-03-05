import { useEffect } from "react";
import { WalkieTalkieChatStore } from "../store/ChatStore"
import User from "./User";
import { LoaderIcon } from 'lucide-react'
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { walkieTalkieAuthStore } from "../store/AuthStore";

export default function Users() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = WalkieTalkieChatStore();
  const { onlineUsers } = walkieTalkieAuthStore();

  useEffect(()=>{
    getUsers();
  }, [ getUsers ]);
  
  if(isUsersLoading){
    return (
    <div className="flex justify-center items-center shadow-lg shadow-primary">
      <div className="bg-base-200/70 text-center">
        <SidebarSkeleton />
      </div>
    </div>
    )
  }

  console.log(users)
  return (
    <div className="bg-base-200/50 flex flex-col justify-between items-center">
        {
            users?.map(user => (
                <button
                key={user?._id}
                onClick={()=>setSelectedUser(user)}
                className={`w-full p-3 flex justify-center items-center gap-3 hover:bg-base-200 transition-colors
                  ${selectedUser?._id === user._id ? "bg-base-100-/90 ring-2 ring-base-300" : ""}
                  `}
                >
                  <div className="">
                    <img 
                    src={user?.profilePic || "/vite.svg"} 
                    alt={user?.username} 
                    className="object-cover size-12 rounded-full"
                    />
                  </div>
                  <div className="text-left mx-auto hidden lg:block">
                    <h4 className="text-lg font-bold">{user?.username}</h4>
                    <div className="text-sm font-thin">
                        {onlineUsers.includes(user?._id) ? "Online" : "Offline"}
                    </div>
                  </div>
                </button>
            ))
        }
    </div>
  )
}
