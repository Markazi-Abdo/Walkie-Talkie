import { Image, Send, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast'
import { WalkieTalkieChatStore } from '../store/ChatStore'
import { walkieTalkieAuthStore } from '../store/AuthStore';

export default function MessageInput() {
  const [ message, setMessage ] = useState('');  
  const [ imagePreview, setImagePreview ] = useState(null);
  const inputRef = useRef(null);
  const { sendMessage, selectedUser } = WalkieTalkieChatStore();
  const { authUser } = walkieTalkieAuthStore();
  
  const handlePreviewChange = (e) => {
    const file = e.target.files[0];
    const renderer = new FileReader();

    renderer.onloadend = () => {
        setImagePreview(renderer.result);
    }
    renderer.readAsDataURL(file);
  };

  const handleRemove = () => {
    setImagePreview(null);
    if(inputRef.current) inputRef.current.value = null;
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
        await sendMessage({
            text: message.trim(),
            image: imagePreview
        });

        setMessage("");
        setImagePreview(null);
        if(inputRef.current) inputRef.current.value = "";

    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <div>
        <div className='fixed bottom-0 w-full'>
        {
            imagePreview && (
                <div className='ml-5 mb-3 flex items-center gap-2'>
                    <div className="relative">
                        <img src={imagePreview} alt="Preview" className='w-20 h-20 object-cover rounded-lg border border-zinc-800'/>
                        <button
                        onClick={handleRemove}
                        className='p-1 bg-accent absolute -top-2 -right-3 rounded-full'
                        >
                            <X className='text-white size-2'/>
                        </button>
                    </div>
                </div>
            )
        }
            <div className='border-t-2 border-t-primary p-4 flex justify-between items-center gap-5'>
                <form onSubmit={handleSendMessage} className='w-full flex items-center'>
                    <input 
                    type="text" 
                    className='input input-lg input-bordered input-primary rounded-3xl w-2/3'
                    placeholder='Send Message'
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    />
                    <input 
                    type="file" 
                    className='hidden'
                    accept='image/*'
                    ref={inputRef}
                    onChange={handlePreviewChange}
                    />
                    <button
                    type='button'
                    className={`btn btn-circle ml-20 ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                    onClick={()=>inputRef.current?.click()}
                    >
                        <Image className='size-8'/>
                    </button>
                    <button
                    type='submit'
                    className={`btn btn-circle ml-20`}
                    disabled={!message.trim() && !imagePreview}
                    >
                        <Send className='size-8'/>
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
