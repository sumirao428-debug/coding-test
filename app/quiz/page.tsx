'use client'

import { useState } from 'react'
import { questions } from '@/data/questions'

type Step = 'quiz' | 'email' | 'result'

interface AnalyzeResult {
  percentage: number
  result: {
    code: string
    label: string
    burnoutDescriptor: string
    personalityAnalysis: string
    traits: string[]
    advice: string
  }
  fullAnalysis: string
}

// per-result color config
const RESULT_CONFIG: Record<string, { color: string; glow: string; bgFrom: string; bgTo: string }> = {
  FRESH:              { color: '#34d399', glow: 'rgba(52,211,153,0.22)',  bgFrom: 'rgba(52,211,153,0.07)',  bgTo: 'rgba(6,78,59,0.10)'   },
  OPTIMIST:           { color: '#a3e635', glow: 'rgba(163,230,53,0.22)',  bgFrom: 'rgba(163,230,53,0.07)',  bgTo: 'rgba(54,83,20,0.10)'  },
  REALIST:            { color: '#fbbf24', glow: 'rgba(251,191,36,0.22)',  bgFrom: 'rgba(251,191,36,0.07)',  bgTo: 'rgba(120,53,15,0.10)' },
  CORRODING:          { color: '#fb923c', glow: 'rgba(251,146,60,0.22)',  bgFrom: 'rgba(251,146,60,0.07)',  bgTo: 'rgba(124,45,18,0.10)' },
  VETERAN_CYNIC:      { color: '#fb7185', glow: 'rgba(251,113,133,0.22)', bgFrom: 'rgba(251,113,133,0.07)', bgTo: 'rgba(136,19,55,0.10)' },
  SOUL_LEFT_BUILDING: { color: '#a78bfa', glow: 'rgba(167,139,250,0.28)', bgFrom: 'rgba(167,139,250,0.09)', bgTo: 'rgba(76,29,149,0.13)' },
  FINAL_FORM:         { color: '#94a3b8', glow: 'rgba(148,163,184,0.18)', bgFrom: 'rgba(30,27,75,0.35)',    bgTo: 'rgba(15,23,42,0.55)'  },
}

export default function QuizPage() {
  const [step, setStep] = useState<Step>('quiz')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resultData, setResultData] = useState<AnalyzeResult | null>(null)

  // transition states — purely visual, no logic change
  const [visible, setVisible] = useState(true)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  function selectAnswer(optionIndex: number) {
    if (selectedIdx !== null) return
    setSelectedIdx(optionIndex)
    // 150ms: show selection highlight, then fade out
    setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        // original logic — untouched
        const newAnswers = [...answers, optionIndex]
        setAnswers(newAnswers)
        if (currentQ < questions.length - 1) {
          setCurrentQ(currentQ + 1)
        } else {
          setStep('email')
        }
        setSelectedIdx(null)
        setVisible(true)
      }, 260)
    }, 150)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      if (!analyzeRes.ok) throw new Error('分析失敗，請稍後再試')
      const analyzeData: AnalyzeResult = await analyzeRes.json()

      const leadsRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          answers,
          result: analyzeData.fullAnalysis,
          resultType: analyzeData.result.code,
        }),
      })
      const leadsData = await leadsRes.json()
      if (!leadsRes.ok) throw new Error(leadsData.error || '儲存失敗')

      setResultData(analyzeData)
      setStep('result')
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生錯誤，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  // ─── 答題頁 ─────────────────────────────────────────────────
  if (step === 'quiz') {
    const q = questions[currentQ]
    const progress = Math.round((currentQ / questions.length) * 100)

    return (
      <main className="min-h-screen bg-[#0B0B18] flex flex-col px-5 pt-10 pb-12 relative overflow-hidden">
        {/* ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-600/8 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 w-full max-w-[430px] mx-auto flex flex-col flex-1">
          {/* progress */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-400 text-sm font-medium">第 {currentQ + 1} 題</span>
            <span className="text-slate-600 text-xs tabular-nums">{currentQ} / {questions.length}</span>
          </div>
          <div className="w-full bg-white/[0.08] h-[5px] rounded-full mb-8 overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* question + options — transition wrapper */}
          <div
            className={`transition-all duration-[260ms] ease-in-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            {/* question card */}
            <div className="bg-white/[0.05] border border-white/[0.10] rounded-2xl p-6 mb-5">
              <h2 className="text-white text-xl font-bold leading-snug" style={{ textWrap: 'balance' }}>
                {q.question}
              </h2>
            </div>

            {/* options */}
            <div className="flex flex-col gap-[10px]">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  disabled={selectedIdx !== null}
                  className={[
                    'w-full text-left px-5 py-[15px] rounded-2xl border font-medium text-[15px] leading-snug',
                    'transition-all duration-150 select-none',
                    selectedIdx === i
                      ? 'bg-violet-500 border-violet-400 text-white scale-[0.975] shadow-[0_0_24px_rgba(124,58,237,0.4)]'
                      : selectedIdx !== null
                        ? 'bg-white/[0.03] border-white/[0.06] text-white/25 cursor-not-allowed'
                        : 'bg-white/[0.05] border-white/[0.10] text-white/90 hover:bg-white/[0.10] hover:border-violet-500/40 active:scale-[0.975]',
                  ].join(' ')}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  // ─── Email 輸入頁 ────────────────────────────────────────────
  if (step === 'email') {
    return (
      <main className="min-h-screen bg-[#0B0B18] flex flex-col items-center justify-center px-5 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/12 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-[390px]">
          <div className="text-center mb-8">
            <div className="text-5xl mb-5">🎯</div>
            <h2 className="text-white text-[26px] font-black mb-2">8 題完成！</h2>
            <p className="text-slate-400 text-base leading-relaxed">
              輸入 Email 查看你的厭世程度分析
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full bg-white/[0.07] border border-white/[0.15] rounded-2xl px-5 py-[15px] text-white placeholder:text-slate-600 text-base focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.10] transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-[17px] bg-gradient-to-r from-violet-500 to-emerald-500 text-white font-bold text-base rounded-full shadow-[0_6px_24px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_32px_rgba(124,58,237,0.45)] hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none transition-all duration-200"
            >
              {loading ? '分析中...' : '查看結果 →'}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
          )}
        </div>
      </main>
    )
  }

  // ─── 結果頁 ─────────────────────────────────────────────────
  if (step === 'result' && resultData) {
    const { percentage, result } = resultData
    const cfg = RESULT_CONFIG[result.code] ?? RESULT_CONFIG['SOUL_LEFT_BUILDING']

    return (
      <main className="min-h-screen bg-[#0B0B18] flex flex-col items-center justify-start px-5 py-10 overflow-y-auto relative">
        {/* ambient glow matching result color */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: cfg.glow }}
        />

        <div className="relative z-10 w-full max-w-[390px]">
          {/* result card */}
          <div
            className="rounded-3xl overflow-hidden border"
            style={{
              background: `linear-gradient(145deg, ${cfg.bgFrom}, ${cfg.bgTo})`,
              borderColor: `color-mix(in srgb, ${cfg.color} 25%, transparent)`,
              boxShadow: `0 0 0 1px color-mix(in srgb, ${cfg.color} 15%, transparent), 0 32px 64px rgba(0,0,0,0.4)`,
            }}
          >
            <div className="px-6 pt-7 pb-7">
              {/* watermark */}
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-6 text-white/30">
                上班 Coding 厭世程度測驗
              </p>

              {/* percentage */}
              <span
                className="font-black leading-none block mb-2"
                style={{ fontSize: '80px', letterSpacing: '-0.03em', color: cfg.color }}
              >
                {percentage}%
              </span>

              {/* result label */}
              <h1 className="text-[22px] font-black text-white leading-tight mb-3">
                {result.label}
              </h1>

              {/* burnout descriptor */}
              <span
                className="inline-block text-[11px] font-medium px-3 py-[6px] rounded-full mb-5"
                style={{
                  background: `color-mix(in srgb, ${cfg.color} 15%, transparent)`,
                  color: cfg.color,
                }}
              >
                {result.burnoutDescriptor}
              </span>

              {/* divider */}
              <div
                className="h-px mb-5"
                style={{ background: `color-mix(in srgb, ${cfg.color} 20%, transparent)` }}
              />

              {/* personality analysis */}
              <p className="text-sm leading-relaxed mb-5 text-white/75">
                {result.personalityAnalysis}
              </p>

              {/* traits */}
              <div className="flex flex-wrap gap-2 mb-5">
                {result.traits.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-[6px] rounded-full text-[11px] font-medium border"
                    style={{
                      background: `color-mix(in srgb, ${cfg.color} 12%, transparent)`,
                      color: cfg.color,
                      borderColor: `color-mix(in srgb, ${cfg.color} 25%, transparent)`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* advice */}
              <div
                className="rounded-2xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <p className="text-xs italic leading-relaxed text-white/55">
                  「{result.advice}」
                </p>
              </div>
            </div>
          </div>

          <p className="text-white/20 text-[11px] text-center mt-5 tracking-wide">
            截圖分享給你的工程師朋友吧
          </p>
        </div>
      </main>
    )
  }

  return null
}
