import { supabase } from "../supabaseClient"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5249/api'

export const signupWithSupabase = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error || !data.session?.access_token) {
    throw new Error(error?.message || 'Failed to create Supabase account')
  }

  return {
    user: data.user,
    accessToken: data.session.access_token,
  }
}

export const createUserInBackend = async (accessToken: string, userData: {
  email: string
  username: string
  name?: string
  profilePicture: string
  favoriteSport: string
  favoriteTeam: string
}) => {
  const res = await fetch(`${BACKEND_URL}/auth/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userData),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Failed to create backend user: ${res.status} – ${error}`)
  }

  return res.json()
}


export const signIn = async (accessToken: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) throw new Error('Failed to fetch user data')
  return await res.json()
}