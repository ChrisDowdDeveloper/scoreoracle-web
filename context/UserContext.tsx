'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { signIn } from '@/utils/auth/auth'
import { User as SupabaseUser } from '@supabase/auth-js'

type User = {
  userId: string
  email: string
  name: string
  username: string
  profilePicture?: string
  favoriteSport?: string
  favoriteTeam?: string
  accessToken: string
}

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const restoreUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      const accessToken = data.session?.access_token

      if (!accessToken) return

      try {
        const userData = await signIn(accessToken)
        setUser({
          ...userData,
          accessToken,
        })
      } catch (err) {
        console.error('Error restoring user:', err)
        setUser(null)
      }
    }

    restoreUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used inside a UserProvider')
  return context
}
