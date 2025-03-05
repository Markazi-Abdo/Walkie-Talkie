import React from 'react'
import Users from './Users'
import { User } from 'lucide-react'

export default function SideBar() {
  return (
    <aside className='bg-neutral flex flex-col p-1.5'>
      <div className='border-b-2 border-base-300 w-full p-5'>
        <div className='flex flex--col gap-1'>
          <User className='text-accent size-6'/>
          <span className='hidden lg:block font-thin text-base-300'>Contacts</span>
        </div>
      </div>
      <div>
        <Users />
      </div>
    </aside>
  )
}
