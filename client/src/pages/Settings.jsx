import React from 'react'
import { themes } from '../constants'
import { WalkieTalkieThemeStore } from '../store/ThemeStore'

export default function Settings() {
  const {theme, setTheme } = WalkieTalkieThemeStore();
  const PREVIEW_MESSAGES = [
    {id: 1, content : "SalamoAlaykom", isSent: false},
    {id: 2, content: "Wa3alkomoSalam", isSent: true}
  ]

  return (
    <div className=' max-w-5xl p-5 pt-15 mx-auto'>
      <div className='space-y-8 bg-base-300/50 rounded-2xl'>
      {/* Header */}
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='font-bold text-2xl'>Themes</h1>
          <p className='text-lg font-thin'>Choose the theme you find interesting.</p>
        </div>
        {/* Themes */}
        <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8'>
          {
            themes.map(( t ) => (
              <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-colors ${theme === t ? "bg-base-300/80" : "hover:bg-base-200/50"}`}
              onClick={()=>setTheme(t)}
              >
                <div className='relative h-8 w-full rounded-xl overflow-hidden' data-theme={t}>
                  <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className='text-md font-medium truncate w-full text-center'>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))
          }
        </div>
        {/* Theme */}
        <div>
          <h1 className='text-2xl font-bold text-center'>Preview</h1>
        </div>
      </div>
    </div>
  )
}
