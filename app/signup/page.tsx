'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { signupWithSupabase, createUserInBackend } from '@/utils/auth/auth'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { accessToken } = await signupWithSupabase(email, password)

      await createUserInBackend(accessToken, {
        email,
        username,
        profilePicture: '',
        favoriteSport: '',
        favoriteTeam: '',
      })

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <div className="flex justify-center mb-6">
          <Image
            src="/full-logos/ScoreOracleAltLight.png"
            alt="ScoreOracle Logo"
            width={300}
            height={300}
            className="h-auto w-auto max-w-[300px] md:max-w-[300px]"
            priority
          />
        </div>

        <h1 className="text-3xl font-extrabold text-[#111827] text-center mb-4">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#E5E7EB] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <p className="text-center text-sm text-[#4B5563] mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-[#EF4444] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}
