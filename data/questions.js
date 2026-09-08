export const questions = [
  {
    id: 1,
    question: '早上開機，看到 CI 又炸了，你的第一反應是？',
    options: [
      { text: '馬上查哪裡壞了，我能修！', weight: 1.3 },
      { text: '先喝杯咖啡再說', weight: 4.2 },
      { text: '截圖丟給隊友，說「你看」', weight: 7.5 },
      { text: '默默嘆氣，開啟第 47 個 Stack Overflow 分頁', weight: 9.8 },
      { text: '直接關螢幕，假裝沒發生', weight: 12.7 },
    ],
  },
  {
    id: 2,
    question: 'PM 突然說「這個功能本週五要上線」，你的反應？',
    options: [
      { text: '好，我評估一下工時', weight: 1.5 },
      { text: '沒問題，但我需要優先排序', weight: 3.8 },
      { text: '嘴上說好，內心 OS 已罵完三遍', weight: 6.6 },
      { text: '發了一封落落長的 email 解釋為什麼不行', weight: 10.1 },
      { text: '打開 104 人力銀行', weight: 12.4 },
    ],
  },
  {
    id: 3,
    question: 'Code review 被留了 30 幾個 comment，你怎麼辦？',
    options: [
      { text: '認真逐條回覆，很感謝對方用心', weight: 1.1 },
      { text: '一邊罵一邊改，最後還是說謝謝', weight: 4.7 },
      { text: '只改 blocker，其他全部自己 resolve', weight: 7.3 },
      { text: '直接找 reviewer 一對一說清楚', weight: 9.2 },
      { text: '把整個 PR 關掉，說「需要重新設計」', weight: 12.9 },
    ],
  },
  {
    id: 4,
    question: '你遇到一段沒有任何 comment 的 500 行 function，需要改它',
    options: [
      { text: '我會先讀懂再動手，這是好的學習機會', weight: 1.4 },
      { text: '加幾個 console.log 試試水溫', weight: 5.1 },
      { text: 'git blame，把原作者揪出來問清楚', weight: 7.8 },
      { text: '先寫測試再動，反正不管怎樣都會壞', weight: 10.3 },
      { text: '祈禱後直接改，push 完立刻關電腦', weight: 12.6 },
    ],
  },
  {
    id: 5,
    question: '下班前十分鐘，production 炸了',
    options: [
      { text: '留下來查，責任感第一', weight: 1.7 },
      { text: '先通知相關人員再決定要不要留', weight: 4.4 },
      { text: 'rollback 先，明天再說', weight: 8.2 },
      { text: '在群組說「我現在沒網路」', weight: 10.7 },
      { text: '已讀不回，手機靜音，走人', weight: 13.1 },
    ],
  },
  {
    id: 6,
    question: '你寫的功能三個月後自己看不懂了',
    options: [
      { text: '沒關係，重新閱讀一遍就能找回狀態', weight: 1.2 },
      { text: '加個 TODO: 之後來重構', weight: 4.9 },
      { text: '這就是過去的我，我尊重他', weight: 7.1 },
      { text: '複製一份改名叫 _v2，原版留著以防萬一', weight: 9.6 },
      { text: '刪掉重寫，反正沒人知道', weight: 11.8 },
    ],
  },
  {
    id: 7,
    question: '你要怎麼形容公司的技術債？',
    options: [
      { text: '有待改進的歷史遺產', weight: 1.6 },
      { text: '合理的短期工程取捨', weight: 3.9 },
      { text: '一座隨時會噴發的活火山', weight: 7.4 },
      { text: '我已經麻木了', weight: 10.5 },
      { text: '我就是技術債本人', weight: 12.3 },
    ],
  },
  {
    id: 8,
    question: '站會的時候你最常說的是？',
    options: [
      { text: '「今天預計完成 XXX，目前沒有 blocker」', weight: 1.5 },
      { text: '「進度順利，但有個小問題想討論一下」', weight: 4.1 },
      { text: '「差不多，快了」', weight: 6.8 },
      { text: '「還在查，比想像中複雜」', weight: 9.4 },
      { text: '「同昨天」', weight: 12.1 },
    ],
  },
]

// 百分比公式：Math.round((totalScore - minScore) / (maxScore - minScore) * 100)
// 結果對應表在 data/results.js
export const scoring = {
  minScore: 11.3,
  maxScore: 99.9,
}

export function calculateResult(answers) {
  const totalScore = answers.reduce((sum, weight) => sum + weight, 0)
  const percentage = Math.round(
    ((totalScore - scoring.minScore) / (scoring.maxScore - scoring.minScore)) * 100
  )
  return { totalScore, percentage: Math.min(100, Math.max(0, percentage)) }
}
