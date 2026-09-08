import { NextRequest, NextResponse } from 'next/server'
import { questions, calculateResult } from '@/data/questions'
import { getResult, composeFullAnalysis } from '@/data/results'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { answers } = body as { answers: unknown }

  if (!Array.isArray(answers) || answers.length !== questions.length) {
    return NextResponse.json(
      { error: `answers 必須是長度為 ${questions.length} 的陣列` },
      { status: 400 }
    )
  }

  const weights: number[] = []
  for (let i = 0; i < answers.length; i++) {
    const idx = answers[i]
    const q = questions[i]
    if (typeof idx !== 'number' || idx < 0 || idx >= q.options.length) {
      return NextResponse.json(
        { error: `第 ${i + 1} 題的答案索引無效（應為 0～${q.options.length - 1}）` },
        { status: 400 }
      )
    }
    weights.push(q.options[idx].weight)
  }

  const { totalScore, percentage } = calculateResult(weights)
  const result = getResult(percentage)

  if (!result) {
    return NextResponse.json({ error: '無法對應結果，請確認百分比範圍' }, { status: 500 })
  }

  return NextResponse.json({
    percentage,
    totalScore: Math.round(totalScore * 10) / 10,
    result: {
      code: result.code,
      label: result.label,
      burnoutDescriptor: result.burnoutDescriptor,
      personalityAnalysis: result.personalityAnalysis,
      traits: result.traits,
      advice: result.advice,
    },
    fullAnalysis: composeFullAnalysis(result, percentage),
  })
}
