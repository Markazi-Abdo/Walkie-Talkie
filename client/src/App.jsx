import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { walkieTalkieAuthStore } from "./store/AuthStore";
import { useEffect } from "react";
import { Loader } from 'lucide-react'
import { Toaster } from "react-hot-toast";
import { WalkieTalkieThemeStore } from "./store/ThemeStore";


export default function App() {
  const { authUser, checkAuth, isChecking, onlineUsers } = walkieTalkieAuthStore();
  const { theme } = WalkieTalkieThemeStore();
  useEffect(()=>{
    checkAuth();
  }, [ checkAuth ])
  console.log(onlineUsers)
  if(isChecking && !authUser) return(
    <div className="h-screen flex justify-center items-center">
      <Loader className="size-10 animate-spin"></Loader>
      <h1>Getting Data....</h1>
    </div>
  )

  return (
    <main
    data-theme = {theme}
    className='min-h-screen w-screen p-0 m-0 box-border overflow-hidden overflow-y-hidden'
    >
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />}></Route>  
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to='/' />}></Route>  
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to='/' />}></Route>  
        <Route path="/settings" element={<Settings />}></Route>  
        <Route path="/profilePage" element={authUser ? <Profile /> : <Navigate to='/login' />}></Route>  
      </Routes>
      <Toaster 
      position="top-left"
      reverseOrder={true}
      />
    </main>
  )
}
