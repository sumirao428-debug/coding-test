'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : '登入失敗')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-8 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-6">後台登入</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="密碼"
          className="border px-4 py-2 rounded w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? '登入中...' : '登入'}
        </button>
      </form>
      {error && <p className="mt-3 text-red-500">{error}</p>}
    </main>
  )
}
