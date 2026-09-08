import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Lead from '@/models/Lead'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, answers, result, resultType } = body as {
    email: unknown
    answers: unknown
    result: unknown
    resultType: unknown
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'email 格式不正確' }, { status: 400 })
  }
  if (!Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json({ error: 'answers 必須是非空陣列' }, { status: 400 })
  }
  if (typeof result !== 'string' || result.trim() === '') {
    return NextResponse.json({ error: 'result 不可為空' }, { status: 400 })
  }
  if (typeof resultType !== 'string' || resultType.trim() === '') {
    return NextResponse.json({ error: 'resultType 不可為空' }, { status: 400 })
  }

  try {
    await connectDB()

    const doc = await Lead.findOneAndUpdate(
      { email: email.trim().toLowerCase() },
      { answers, result: result.trim(), resultType: resultType.trim(), createdAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    return NextResponse.json({ success: true, id: doc._id })
  } catch (err) {
    console.error('[POST /api/leads]', err)
    return NextResponse.json({ error: '資料庫儲存失敗' }, { status: 500 })
  }
}
