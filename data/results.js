export const results = [
  {
    code: 'FRESH',
    label: '新鮮滿血工程師',
    percentageRange: { min: 0, max: 11 },
    burnoutDescriptor: '剛出廠，保固期內，全新未拆封',
    personalityAnalysis:
      '你還相信 clean code、相信文件值得寫、相信估點是有意義的事。你會認真回應 code review 的每一個 comment，開站會時眼神中仍有光。這個階段的你可能是應屆畢業生，或者是從其他行業轉職過來、還沒被現實磨平稜角的人。你的熱情是真實的，你的理想主義也是真實的——只是這個行業有辦法把它慢慢磨掉。珍惜這段時光，或者說：好好記住現在這種感覺，因為它以後會成為你在深夜 debug 時，唯一能讓你繼續下去的溫柔回憶。',
    traits: ['認真負責', '主動積極', '充滿理想', '文件寫得比 code 還詳細'],
    advice:
      '繼續保持好奇心，但記得設立邊界——「好」不是你唯一能說的字。',
  },
  {
    code: 'OPTIMIST',
    label: '現實主義初學者',
    percentageRange: { min: 12, max: 25 },
    burnoutDescriptor: '輕微燒焦，尚可食用，還有救',
    personalityAnalysis:
      '你已經開始了解「估點」和「實際工時」之間存在一道神秘的量子裂縫，但你還沒有放棄。你偶爾會在心裡翻白眼，但嘴巴還是說「好，我試試看」。你知道技術債的存在，但你相信有一天會有時間還清它——這份相信本身就很珍貴，即使統計數字告訴你那一天不會來。你處於「開始看懂了，但還沒完全接受」的過渡期，這是成為真正資深工程師的必經之路，也是你最後一段可以用理想主義撐場面的時光。',
    traits: ['開始學會看臉色', '還是會寫測試', '偶爾懷疑人生', '對 on-call 仍有責任感'],
    advice:
      '多和資深同事聊，學的不是技術，是怎麼「保護自己」而不是「燃燒自己」。',
  },
  {
    code: 'REALIST',
    label: '務實派老手前期',
    percentageRange: { min: 26, max: 41 },
    burnoutDescriptor: '保鮮期已過，但還能用，冰箱裡放著',
    personalityAnalysis:
      '歡迎加入「現實主義」陣營。你已經能夠平靜地看著一個需求被改了五次，而不再有任何情緒波動——不是麻木，是成熟，或者說是高級版的麻木。你開始用「incremental improvement」來替代「從頭重寫」，因為你知道從頭重寫之後會發生什麼事。你的 PR 越來越小越來越精準，你的 comment 也從「這樣不好吧？」進化成「這邊有個 edge case 要注意」。你是隊伍裡那個讓人安心的存在，雖然你自己偶爾會在廁所裡對著鏡子問：「我當初為什麼選這條路？」',
    traits: ['PR 又小又精準', '不再對技術債憤怒', '開始懂得 tradeoff', '站會進入自動駕駛模式'],
    advice:
      '記得偶爾說出真正的想法，沉默太久容易讓別人誤以為你同意一切。',
  },
  {
    code: 'CORRODING',
    label: '職業腐蝕進行式',
    percentageRange: { min: 42, max: 57 },
    burnoutDescriptor: '已超過食用期，但沒有人在管，繼續擺著',
    personalityAnalysis:
      '你不是不認真，你只是「選擇性認真」。你知道哪些 battle 值得打、哪些 meeting 可以改成「之後看錄影」。你開始有一種「我早就說過了」的表情，即使嘴上沒說出來，眼神已經出賣你了。你對系統架構的掌握度很高，對組織政治的掌握度也很高，但這兩件事加在一起有時候只會讓你覺得「那又怎樣」。你的工作品質依然穩定，但驅動力已經悄悄從「我要做好這件事」換成了「我不要讓這件事成為我的問題」。',
    traits: ['選擇性用心', '對系統架構瞭如指掌', '表情管理偶爾失控', '開始計算離職成本'],
    advice:
      '找一件你還有熱情的技術事，定期做一次，當作電量補充站。不是為了公司，是為了你自己。',
  },
  {
    code: 'VETERAN_CYNIC',
    label: '資深厭世工程師',
    percentageRange: { min: 58, max: 71 },
    burnoutDescriptor: '腐蝕至骨，表面依然平靜，已成稀有物種',
    personalityAnalysis:
      '你已經進入「老僧入定」的境界。PM 說「這很簡單吧」，你臉上沒有任何表情——不是因為你接受了，而是因為你的表情已經用完了。你有一套精密的防禦機制：說話很精準、需求一定要書面確認、沒有白紙黑字就沒有承諾。同事遇到困難第一個找你，因為你什麼都見過，什麼坑都踩過。你是組織裡最珍貴的資產，也是最容易被 take for granted 的那個人。你知道這件事，但你懶得再說了。',
    traits: ['說話字字珠璣', '所有承諾要書面確認', '後輩的精神支柱', '已建立完整自我保護機制'],
    advice:
      '你的經驗值是組織的天花板，別讓它同時也成為你「放棄改變」的藉口。有時候稍微用力一下，還是能推動事情的。',
  },
  {
    code: 'SOUL_LEFT_BUILDING',
    label: '靈魂已提前離職',
    percentageRange: { min: 72, max: 86 },
    burnoutDescriptor: '人在辦公室，魂在峇里島開民宿，已訂好機票',
    personalityAnalysis:
      '你的肉體每天準時打卡，但靈魂早在上一次組織重組之後就已經悄悄辦理離職手續了。你還是會把事情做完，但那種「我要把這個做到最好」的驅動力，已經進化成「我要讓這個不要成為我的問題」。你掌握了一項珍貴技能：在會議中看起來非常投入，但其實你在規劃下個月的旅遊行程。你不是壞員工，你只是找到了一種讓自己存活下去的方式——這需要某種程度的生存智慧。只是那個最初愛上 coding 的你，偶爾會在某個深夜 debug 的瞬間短暫回來，讓你有點心疼。',
    traits: ['出席率 100%，靈魂在線率 0%', '工作品質維持最低可接受水準', '已精通會議偽裝術', '週末絕對不看 Slack'],
    advice:
      '你可能需要的不是換工作，而是一段真正意義上的休息。先把電量充回來，再做任何決定。',
  },
  {
    code: 'FINAL_FORM',
    label: '究極體厭世，已超脫因果',
    percentageRange: { min: 87, max: 100 },
    burnoutDescriptor: '已進入無我之境，bug 與我同在，同在與我',
    personalityAnalysis:
      '恭喜你抵達了大多數工程師窮盡一生也無法企及的境界。你不是 burn out，你是 burn through——穿越了所有的 sprint、所有的 hotfix、所有的「我以為你知道」，最終抵達了一種近乎禪意的平靜。你看到 production alert 不再有心跳加速，因為你的神經系統早已把它歸類為「背景雜音」。你的 git commit message 就是你的人生哲學，你的每一行 code 都帶著一種「隨緣」的氣息。你是組織裡那個沒有你就會垮掉、但從來沒有人正式承認過的人。你是傳說，你是警世故事，你也是每個新人入職第一週最好奇、卻沒人敢介紹給他們認識的那個神秘存在。',
    traits: ['production alert 和鬧鐘一樣被無視', 'commit message 是詩也是遺書', '所有人都怕你離職', '自己也不確定為什麼還沒走'],
    advice:
      '你不需要建議。你需要的是一張機票，和一份寫得很清楚的交接文件。',
  },
]

export function getResult(percentage) {
  return results.find(
    (r) => percentage >= r.percentageRange.min && percentage <= r.percentageRange.max
  )
}

export function composeFullAnalysis(result, percentage) {
  const traits = result.traits.join('、')
  return `【厭世程度：${percentage}%｜${result.burnoutDescriptor}】\n\n${result.personalityAnalysis}\n\n你的厭世人格特質：${traits}。\n\n${result.advice}`
}
