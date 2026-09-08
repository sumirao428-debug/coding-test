'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button onClick={logout} className="px-4 py-2 border rounded hover:bg-gray-50">
      登出
    </button>
  )
}
