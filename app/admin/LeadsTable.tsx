'use client'

import { useState, useEffect } from 'react'

interface Lead {
  _id: string
  email: string
  resultType: string
  createdAt: string
}

interface LeadsResponse {
  leads: Lead[]
  total: number
  page: number
  totalPages: number
}

export default function LeadsTable() {
  const [data, setData] = useState<LeadsResponse | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`/api/admin/leads?page=${page}&limit=20`)
      .then((res) => {
        if (!res.ok) throw new Error('載入失敗')
        return res.json()
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [page])

  async function downloadExcel() {
    setDownloading(true)
    try {
      const res = await fetch('/api/admin/leads/export')
      if (!res.ok) throw new Error('下載失敗')
      const blob = await res.blob()
      const disposition = res.headers.get('Content-Disposition') ?? ''
      const filename = disposition.match(/filename="(.+?)"/)?.[1] ?? 'leads.xlsx'
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert(err instanceof Error ? err.message : '下載失敗')
    } finally {
      setDownloading(false)
    }
  }

  const total = data?.total ?? 0

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">
          {loading ? '載入中...' : `共 ${total} 筆`}
        </p>
        <button
          onClick={downloadExcel}
          disabled={downloading || loading || total === 0}
          className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {downloading ? '下載中...' : '下載 Excel'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {!loading && total === 0 ? (
        <p className="text-gray-500">目前沒有名單</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white/10 text-gray-300">
                  <th className="border border-white/10 px-4 py-2 text-left">Email</th>
                  <th className="border border-white/10 px-4 py-2 text-left">風格代號</th>
                  <th className="border border-white/10 px-4 py-2 text-left">填答時間</th>
                </tr>
              </thead>
              <tbody>
                {data?.leads.map((lead) => (
                  <tr key={lead._id} className="text-gray-200 hover:bg-white/5">
                    <td className="border border-white/10 px-4 py-2">{lead.email}</td>
                    <td className="border border-white/10 px-4 py-2">{lead.resultType}</td>
                    <td className="border border-white/10 px-4 py-2">
                      {new Date(lead.createdAt).toLocaleString('zh-TW')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data && data.totalPages > 1 && (
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                上一頁
              </button>
              <span className="text-sm">
                {page} / {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === data.totalPages}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                下一頁
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
