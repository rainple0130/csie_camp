export default function ActivitiesPage() {
  const activities = [
    {
      title: "大地遊戲",
      description: "透過闖關活動，讓小隊員們在遊戲中培養團隊默契與合作精神。結合校園探索與趣味任務，創造難忘的營隊回憶。",
    },
    {
      title: "賭場",
      description: "模擬賭場環境的趣味活動，讓小隊員體驗機率與策略的樂趣。在遊戲中學習數學思維，同時享受緊張刺激的競賽氛圍。",
    },
    {
      title: "密室逃脫",
      description: "考驗邏輯推理與團隊合作能力的密室解謎活動。小隊員需要運用觀察力與創意思維，破解謎題並成功逃脫。",
    },
    {
      title: "智慧鐵人",
      description: "結合體能與智力的綜合競賽，挑戰小隊員的極限。透過多元關卡設計，培養解決問題的能力與團隊向心力。",
    },
    {
      title: "算法大地",
      description: "將演算法概念融入遊戲的創新活動，讓小隊員在玩樂中學習程式思維。透過實際操作理解演算法的運作原理。",
    },
    {
      title: "賽局",
      description: "運用賽局理論設計的策略競賽，讓小隊員體驗決策與競爭的樂趣。在互動中學習理性思考與策略規劃的重要性。",
    },
  ];

  return (
    <div className="min-h-screen bg-ivory text-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray sm:text-4xl">活動介紹</h1>
        <p className="mt-2 text-lg text-silver">不只有課程，還有豐富多元的營隊活動</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/50 p-6 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-aqua">{activity.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-gray">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

