import React, { useState } from 'react';
import { walkieTalkieAuthStore } from '../store/AuthStore';
import { Camera } from 'lucide-react';

export default function Profile() {
  const { authUser, isUpdating, updateProfile } = walkieTalkieAuthStore();
  const [ selectedImage, setSelectedImage ] = useState(null);
  const handleUpdate = async (e) =>{
    const vFile = e.target.files[0];
    if(!vFile) return;

    const renderer = new FileReader();

    renderer.readAsDataURL(vFile);
    renderer.onload = async () =>{
      const base64Image = renderer.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image })
    }
  }
  return (
    <div className='pt-12'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold'>Profile</h1>
            <p className='text-lg font-light'>Your Profile information</p>
          </div>
          {/* Avatar */}
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='relative'>
                <img 
                src={ selectedImage ||authUser.userData.profilePic || "/vite.svg"} 
                alt="Profile Pic" 
                className='size-32 p-5 rounded-full object-cover border-4'
                />
                <label 
                htmlFor="avatar-upload"
                className={` border absolute bottom-0 right-0 hover:scale-105 p-2 rounded-full cursor-pointer transition duration-200 
                  ${isUpdating ? "animate-pulse pointer-events-none " : "" }
                `}
                >
                  <Camera className='w-5 h-5 text-yellow-500' />
                  <input 
                  type="file"
                  className='opacity-0 absolute w-full h-full cursor-pointer inset-0'
                  disabled={isUpdating}
                  onChange={handleUpdate}
                  />
                </label>
            </div>
            <p className='text-sm text-zinc-500'>
              {isUpdating ? "Updating..." : "Click the camera icon above to change the profile picture"}
            </p>

            {/* Information ( E-mail, userName ) */}
            <div className='form-control gap-2 text-center'>
                <label htmlFor="username">Full Name</label>
                <input 
                type="text" 
                readOnly 
                className='input input-bordered w-full'
                value={authUser?.userData.username}
                />
                <label htmlFor="username">E-mail</label>
                <input 
                type="text" 
                readOnly 
                className='input input-bordered w-full'
                value={authUser?.userData.email}
                />
            </div>

            <div className='mt-6 bg-base-300 rounded-2xl'>
                <h2 className='font-bold text-xl'>Account Information</h2>
                <div className='space-y-3 text-sm'>
                  <div className='flex items-center justify-between border-b border-zinc-500'>
                    <p>Member Since </p>
                    <p>{authUser?.userData.createdAt.split("T")[0]}</p>
                  </div>
                  <div className='flex items-center justify-between border-b border-zinc-500'>
                    <p>Member Staus</p>
                    {
                      authUser ? <p className='text-success'>Active</p> : <p className='text-danger'>Offline</p>
                    }
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
