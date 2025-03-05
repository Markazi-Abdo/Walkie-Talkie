import { MessageSquare, SettingsIcon, User2Icon, LogOut } from "lucide-react";
import { walkieTalkieAuthStore } from "../store/AuthStore";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { logoutUser, authUser } = walkieTalkieAuthStore();
   
  return (
    <nav className="flex justify-between items-center bg-primary/10 p-1">
      <Link to="/">
          <div
            className='rounded-lg p-1 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'
            >
              <MessageSquare className='size-6 text-primary'/><span className="font-black">WalkieTalkie</span>
          </div>
      </Link>
      <div className="flex items-center justify-around gap-4">
        <Link to="/settings">
            <div
            className='rounded-lg p-1 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'
            >
              <SettingsIcon className="size-6 text-primary"/>Settings
            </div>
        </Link>
        {
          authUser && (
            <>
              <Link to="/profilePage">
                <div 
                className="rounded-lg p-1 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="flex justify-center items-center"><User2Icon className="size-6 text-primary" />Profile</span>
                </div>
              </Link>

              <div
              className="rounded-lg p-1 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <button
                onClick={logoutUser}
                className="flex justify-center items-center"><LogOut className="size-6 text-primary" />LogOut</button>
              </div>
            </>
          )
        }
      </div>
    </nav>
  )
}
