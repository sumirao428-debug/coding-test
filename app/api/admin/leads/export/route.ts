import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
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

  await connectDB()

  const leads = await Lead.find({}, 'email resultType createdAt')
    .sort({ createdAt: -1 })
    .lean()

  const rows = leads.map((lead) => ({
    Email: lead.email,
    風格: lead.resultType,
    填答時間: new Date(lead.createdAt).toLocaleString('zh-TW'),
  }))

  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '名單')

  const buffer: Uint8Array = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

  const date = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  const filename = `${date}.xlsx`

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
