/** 活動介紹頁：一般活動、學術活動、參訪與講座（單頁分頁） */

export const activityTabIds = ["general", "academic", "visit"] as const;
export type ActivityTabId = (typeof activityTabIds)[number];

export function isActivityTabId(v: string | null | undefined): v is ActivityTabId {
  return activityTabIds.includes(v as ActivityTabId);
}

export const activityTabs: {
  id: ActivityTabId;
  label: string;
  imageSrc: string;
  imageAlt: string;
}[] = [
  {
    id: "general",
    label: "闖關遊戲",
    imageSrc: "/activities/general.jpg",
    imageAlt: "闖關遊戲",
  },
  {
    id: "academic",
    label: "資訊思維",
    imageSrc: "/activities/academic.jpg",
    imageAlt: "資訊思維",
  },
  {
    id: "visit",
    label: "參訪 & 講座",
    imageSrc: "/activities/visit.jpg",
    imageAlt: "參訪 & 講座",
  },
];

export const generalActivities: { title: string; description: string }[] = [
  {
    title: "大地遊戲",
    description:
      "透過闖關活動，讓小隊員們在遊戲中培養團隊默契與合作精神。結合校園探索與趣味任務，創造難忘的營隊回憶。",
  },
  {
    title: "賭場",
    description:
      "模擬賭場環境的趣味活動，讓小隊員體驗機率與策略的樂趣。在遊戲中學習數學思維，同時享受緊張刺激的競賽氛圍。",
  },
  {
    title: "密室逃脫",
    description:
      "考驗邏輯推理與團隊合作能力的密室解謎活動。小隊員需要運用觀察力與創意思維，破解謎題並成功逃脫。",
  },
  {
    title: "智慧鐵人",
    description:
      "結合體能與智力的綜合競賽，挑戰小隊員的極限。透過多元關卡設計，培養解決問題的能力與團隊向心力。",
  },
  {
    title: "RPG",
    description:
      "小隊員將在活動中扮演不同的角色，推進故事情節進行，做出不同的選擇決定世界的走向。",
  },
];

export const academicActivities: { title: string; description: string }[] = [
  {
    title: "🔢算法大地🔢",
    description:
      "寫程式不只需要掌握基礎的語法，更需要優雅的「演算法」才能既快速又正確地解決複雜問題。\n在算法大地中，小隊員們將透過團隊合作，發揮創意衝破重重關卡。在關主們的引導下，你們將認識各種演算法如何幫助你做出最佳的決策，感受邏輯思考的魅力！",
  },
  {
    title: "🤖圖靈試驗🤖",
    description:
    "我們正處於人工智慧急速崛起的時代，學會如何駕馭 AI 已成為核心競爭力。\n在圖靈試驗中，小隊員們將與 AI 攜手合作，參與多款有趣的小遊戲。透過與模型的互動，你們將學習如何精準地下達指令，解放 AI 的強大力量，並在娛樂中探索未來科技的無限可能。",
  },
  {
    title: "🎲賽局🎲",
    description:
      "這是一場關於心理戰的巔峰對決！當個人利益與團體利益衝突時，你會選擇合作還是背叛？\n在賽局活動中，小隊需要憑藉手上僅有的片段資訊，預判並反制對手們的行動。透過一系列精彩的互動遊戲，你們將學會在變幻莫測的局勢中，做出最理智的決定。",
  },
];

export type VisitSectionBlock =
  | { type: "placeholder"}
  | { type: "card"; title: string; description: string; imageSrc: string; siteUrl?: string};

export type VisitSection = {
  emoji: string;
  title: string;
  blocks: VisitSectionBlock[];
};

export const visitSections: VisitSection[] = [
  {
    emoji: "🏢",
    title: "企業參訪",
    blocks: [
      {
        type: "card",
        title: "Google",
        description:
          "參訪 Google 台灣辦公室，了解國際科技公司的企業文化與工作環境。透過實地參訪，讓小隊員親身體驗頂尖科技公司的創新氛圍，並與工程師交流，了解資訊產業的職涯發展與工作內容。",
        imageSrc: "/activities/tpke.jpg",
      },
      { type: "card",
        title: "Line",
        description:
          "參訪 Line 台灣辦公室，深入了解亞洲最大的通訊平台企業之一，走訪 Line 的創新工作環境。Line 的成員們將在講座中介紹 Line 的暑期實習計畫，並讓小隊員從工程師身上了解軟體開發與應用，探索資訊產業的職涯機會與工作內容。",
        imageSrc: "/activities/line.jpg",
      },
    ],
  },
  {
    emoji: "🎓",
    title: "教授短講",
    blocks: [
      { type: "card",
        title: "林軒田教授",
        description: "畢業於加州理工學院 (Caltech) 電腦科學博士並師承機器學習大師 Yaser Abu-Mostafa 的林軒田教授，其共同撰寫的《Learning From Data》被全球譽為機器學習「聖經級」教材，至今仍是頂尖大學的必讀首選；他在 Coursera 平台推出的課程吸引全球數十萬人追隨，最擅長將繁複數學證明轉化為清晰脈絡，讓學生深刻理解「為什麼」而非僅是「怎麼用」。林教授曾出任台灣 AI 獨角獸 Appier 的首席資料科學家，是極少數能將高深學術完美接軌真實世界商業應用的指標性人物",
        imageSrc: "/activities/prof_ht.png",
        siteUrl: "https://www.csie.ntu.edu.tw/~htlin/"
      },
      { type: "card",
        title: "李宏毅教授",
        description: "曾任美國 MIT 電腦科學暨人工智慧實驗室客座科學家的李宏毅教授，是華文世界第一位有系統完整講解「深度學習」的學者，讓華文圈的 AI 教學得以與歐美並駕齊驅，其單一影片瀏覽量突破 70 萬次，更是雍有 40 萬訂閱的 Youtube 頻道，更是 YouTube 上全球華人必讀的 AI 入門名師。李教授最令人佩服的是能以極其幽默且易懂的邏輯，將從基礎神經網路到最前沿的生成式 AI (Generative AI) 講述得生動平易，讓高深的學術殿堂變得觸手可及，是將複雜科技轉化為親民知識的絕佳導師。",
        imageSrc: "/activities/prof_lee.png",
        siteUrl: "https://speech.ee.ntu.edu.tw/~hylee/index.php"
      },
      { type: "placeholder"},
    ],
  },
  {
    emoji: "💼",
    title: "職人講座",
    blocks: [
      { type: "card",
        title: "遊戲工程師：詹易衡",
        description: "詹易衡先生現職為專業遊戲設計師與工程師。在享譽國際的國產動作遊戲《九日》中，他擔任了舉足輕重的角色，開發範疇涵蓋了從最核心的戰鬥手感打磨、遊戲機制設計，到深層的程式架構規劃與技術美術。參與了遊戲從無到有的創造過程，與負責最終將作品推向不同平台的終端主機移植工作。\n詹易衡先生將在講座中和我們分享學生時期自學遊戲開發的經驗到進入獨立遊戲產業後的觀察。對於遊戲產業抱有憧憬的各位是否準備好進入遊戲的世界了呢？",
        imageSrc: "/activities/jerry.png",
      },
    ],
  },
];
