import {MessageSquare} from 'lucide-react'

export default function NoChatSelected() {
  return (
    <div className='w-screen flex flex-1 flex-col items-center justify-center p-16 bg-base-100/20'>
        <div className='max-w-md space-y-5 text-center '>
            {/* Icon Display */}
            <div className='flex justify-center gap-4 p-2.5'>
                <div className='relative'>
                    <div className='h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce'>
                        <MessageSquare className='text-primary size-10'/>
                    </div>
                </div>
            </div>
            {/* Welcome Text */}
            <div className='mt-1 text-center text-xl'>
                <h2 className='font-black text-secondary'>Welcome</h2>
                <p className='font-thin'>Chat with your friends with <span className='text-accent'>WALKIETALKIE</span></p>
            </div>
        </div>
    </div>
  )
}
