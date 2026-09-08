import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { signAdminToken } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, password } = body as { email: unknown; password: unknown }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: '請輸入帳號和密碼' }, { status: 400 })
  }

  await connectDB()

  const admin = await Admin.findOne({ email: email.trim().toLowerCase() })
  // 故意不區分「帳號不存在」和「密碼錯誤」，避免帳號枚舉
  if (!admin) {
    return NextResponse.json({ error: '帳號或密碼錯誤' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, admin.hashedPassword)
  if (!valid) {
    return NextResponse.json({ error: '帳號或密碼錯誤' }, { status: 401 })
  }

  const token = signAdminToken({ email: admin.email })

  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 天
    path: '/',
  })
  return res
}
