import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { verifyAdminToken } from '@/lib/jwt'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) {
    return NextResponse.json({ error: '未登入' }, { status: 401 })
  }
  try {
    verifyAdminToken(token)
  } catch {
    return NextResponse.json({ error: '憑證無效或已過期' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
  const skip = (page - 1) * limit

  await connectDB()

  const [leads, total] = await Promise.all([
    Lead.find({}, 'email resultType createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Lead.countDocuments(),
  ])

  return NextResponse.json({
    leads,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  })
}
