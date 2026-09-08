import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'

// 一次性建立管理員帳號。DB 裡已有管理員時自動回 409，不會重複建立。
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, password } = body as { email: unknown; password: unknown }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'email 格式不正確' }, { status: 400 })
  }
  if (typeof password !== 'string' || password.length < 8) {
    return NextResponse.json({ error: '密碼至少 8 個字元' }, { status: 400 })
  }

  await connectDB()

  const existing = await Admin.findOne({})
  if (existing) {
    return NextResponse.json({ error: '管理員已存在，此路由已停用' }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  await Admin.create({ email: email.trim().toLowerCase(), hashedPassword })

  return NextResponse.json({ success: true, message: '管理員建立成功' })
}
