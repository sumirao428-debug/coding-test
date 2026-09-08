import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B18] flex flex-col items-center justify-center px-5 py-16 relative overflow-hidden">
      {/* ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      {/* floating decorative emojis */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span className="absolute top-[8%]  left-[6%]  text-5xl opacity-[0.07]">💻</span>
        <span className="absolute top-[14%] right-[8%] text-4xl opacity-[0.06]">🐛</span>
        <span className="absolute top-[38%] left-[4%] text-3xl opacity-[0.07]">☕</span>
        <span className="absolute top-[52%] right-[5%] text-4xl opacity-[0.06]">🔥</span>
        <span className="absolute bottom-[28%] left-[7%] text-3xl opacity-[0.07]">😮‍💨</span>
        <span className="absolute bottom-[20%] right-[9%] text-3xl opacity-[0.06]">📊</span>
        <span className="absolute bottom-[8%]  left-[35%] text-2xl opacity-[0.05]">⚡</span>
      </div>

      {/* content */}
      <div className="relative z-10 text-center w-full max-w-[390px] mx-auto">
        <p className="text-emerald-400 text-[11px] font-semibold tracking-[0.22em] uppercase mb-6">
          工程師限定 ✦ 心理測驗
        </p>

        <h1 className="font-black leading-[1.08] mb-5">
          <span className="block text-white text-4xl sm:text-5xl">上班</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400 text-5xl sm:text-6xl">
            Coding
          </span>
          <span className="block text-white text-4xl sm:text-5xl">厭世程度測驗</span>
        </h1>

        <p className="text-slate-400 text-base leading-relaxed mb-10">
          共 8 題，選完每題自動跳下一題<br />
          測完立刻知道你的厭世指數
        </p>

        <Link href="/quiz" className="block">
          <button className="w-full py-[18px] px-8 bg-gradient-to-r from-violet-500 to-emerald-500 text-white font-bold text-lg rounded-full shadow-[0_8px_32px_rgba(124,58,237,0.35)] hover:shadow-[0_8px_40px_rgba(124,58,237,0.5)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-200">
            點我開始測驗
          </button>
        </Link>

        <p className="text-slate-700 text-xs mt-5">約 2 分鐘完成，結果可截圖分享</p>
      </div>
    </main>
  )
}
