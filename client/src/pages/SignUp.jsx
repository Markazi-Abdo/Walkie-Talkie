import { useState } from 'react'
import { walkieTalkieAuthStore } from '../store/AuthStore';
import { MessageSquare } from 'lucide-react';

export default function SignUp() {
  const [ showPassword, setShowPassword ] = useState(false);
  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    password: ''
  })
  const { signUp, isSigningUp } = walkieTalkieAuthStore();
  
  return (
    <div className='grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-5 sm:p-12'>
        <div className='w-full max-w-md space-y-7'>
          {/* Logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col justify-center items-center gap-2 group'>
              <div
              className='size-20 rounded-lg p-5 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'
              >
                <MessageSquare className='size-6 text-primary'/>
              </div>
            </div>
          </div>
          {/* Form */}
          <form 
          className='space-y-6'
          >
            <div className='form-control'>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
