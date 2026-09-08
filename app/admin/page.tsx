import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAdminToken } from '@/lib/jwt'
import LeadsTable from './LeadsTable'
import LogoutButton from './LogoutButton'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (!token) redirect('/admin/login')

  try {
    verifyAdminToken(token)
  } catch {
    redirect('/admin/login')
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">後台名單</h1>
        <LogoutButton />
      </div>
      <LeadsTable />
    </main>
  )
}
