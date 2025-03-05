import { useState } from 'react'
import { walkieTalkieAuthStore } from '../store/AuthStore';
import { EyeClosed, Lock, Mail, MessageSquare, User, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthDesign from '../components/AuthDesign';
import toast from 'react-hot-toast';

export default function SignUp() {
  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    password: ''
  })
  const [ eyesOff, setEyesOff ] = useState(true);
  const { signUpUser, isSigningUp } = walkieTalkieAuthStore();

  const validateForm = () => {
    if(!formData.username.trim()) return toast.error("Fill in remaining fields");
    if(!formData.email.trim()) return toast.error("Fill in remaining fields");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password.trim()) return toast.error("Fill in remaining fields");
    if(formData.password.length < 6) return toast.error("Paswword should be longer than 6 characters");

    return true;
  }

  const toggleVisibility = ()=>{
    setEyesOff(!eyesOff);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const success = validateForm();
    success ? signUpUser(formData) : toast.error("Problem Happened");
  }
  return (
    <div className='grid lg:grid-cols-2'>
      {/* Left Side */}
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
          <form>
            <div className='form-control space-y-4'>
                <label htmlFor="fullname" className='label'>
                    <span className='label-text font-medium'>Full Name</span>
                </label>
                <div className='relative '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <User className='size-5 text-base-content/40'/>
                    </div>
                    <input 
                    type="text" 
                    value={formData.username}
                    onChange={(e)=>setFormData({...formData, username: e.target.value})}
                    className='input input-bordered w-full p-5 text-center'
                    placeholder='Enter User Naame (Jane Doe)'
                    />
                </div>
                <label htmlFor="email" className='label'>
                    <span className='label-text font-medium'>Email</span>
                </label>
                <div className='relative '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Mail className='size-5 text-base-content/40'/>
                    </div>
                    <input 
                    type="text" 
                    value={formData.email}
                    onChange={(e)=>setFormData({...formData, email: e.target.value})}
                    className='input input-bordered w-full p-5 text-center'
                    placeholder='username@example.com'
                    />
                </div>
                <div className='form-control'>
                  <label htmlFor="fullname" className='label'>
                      <span className='label-text font-medium'>Password</span>
                  </label>
                  <div className='relative '>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <Lock className='size-5 text-base-content/40'/>
                      </div>
                      <input 
                      type={eyesOff ? "password" : "text"} 
                      value={formData.password}
                      onChange={(e)=>setFormData({...formData, password: e.target.value})}
                      className='input input-bordered w-full p-5 text-center'
                      placeholder='Enter password'
                      />
                      <button
                      className='absolute inset-y-0 right-0 pr-2 flex items-center'
                      type='button'
                      onClick={toggleVisibility}
                      >
                        {
                          eyesOff ? <Eye className='size-5 text-base-content/50'/> : <EyeClosed className='size-5 text-base-content/50'/>
                        }
                      </button>
                  </div>
                </div>
            </div>
          </form>

          {/* Buttons and Links*/}
          <button onClick={handleSubmit} className='w-full btn btn-primary ' disabled={isSigningUp}>
            {
              isSigningUp ? <> <Loader2 size={10} className='animate-spin' />Loading... </> : "Create account"
            }
          </button>
          <div className='text-center'>
            <div className='text-base-content/50'>
                <p>
                  Already Have an account ? 
                  <Link to='/login' className='link link-primary'>
                    <span>Log In</span>
                  </Link>
                </p>
            </div>
          </div> 
        </div>
      </div>
      {/* Right Side */}
      <div className='bg-base-300 h-[750px]'>
        <AuthDesign 
        title={"Join Community"}
        description={"Hello, Im Abdellatif Markazi, an aspiring web developer"}
        />
      </div>
      
    </div>
  )
}
