'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/utils/supabaseClient'
import { signIn } from '@/utils/auth/auth'
import { useUser } from '@/context/UserContext'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (supabaseError || !data.session?.access_token) {
        throw new Error(supabaseError?.message || 'Login failed')
      }

      const accessToken = data.session.access_token

      const userData = await signIn(accessToken)

      setUser({ ...userData, accessToken })
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <div className="flex justify-center mb-6">
          <Image
            src="/full-logos/ScoreOracleAltLight.png"
            alt="ScoreOracle Logo"
            width={180}
            height={180}
            className="h-auto w-auto max-w-[160px] md:max-w-[180px]"
            priority
          />
        </div>

        <h1 className="text-3xl font-extrabold text-[#111827] text-center mb-4">Log In</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#E5E7EB] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#E5E7EB] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EF4444] text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <p className="text-center text-sm text-[#4B5563] mt-4">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-[#EF4444] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}
