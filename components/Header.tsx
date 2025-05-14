'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'

const Header = () => {
  const { user, setUser } = useUser()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setOpen(!open)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/login')
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
      <div className="flex items-center gap-2">
        <Image
          src="/icons/ScoreOracleIcon.png"
          width={100}
          height={100}
          alt="ScoreOracle Icon"
          className="w-15 h-15"
        />
      </div>

      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search teams, sports, leagues..."
          className="w-full max-w-xs px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
        />
      </div>

      <div className="relative" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="focus:outline-none">
          <Image
            src={user?.profilePicture || '/icons/default-avatar.png'}
            alt={user?.username ? `${user.username}'s profile` : 'Default avatar'}
            width={36}
            height={36}
            className="rounded-full border border-gray-300"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 min-w-[160px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <ul className="text-sm text-gray-700">
              <li>
                <button
                  onClick={() => router.push('/profile')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/groups')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Groups
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
