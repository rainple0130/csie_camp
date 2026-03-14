export default function VisitPage() {
  return (
    <div className="min-h-screen bg-ivory text-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray sm:text-4xl">參訪 & 講座</h1>
        <p className="mt-2 text-lg text-silver">深入了解資訊領域的學術研究與產業實務</p>

        {/* 教授講座 */}
        <div className="mt-10 rounded-2xl bg-white/50 p-6 shadow-md sm:p-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎓</span>
            <h2 className="text-2xl font-bold text-aqua">教授講座</h2>
          </div>
          <div className="mt-6 rounded-xl bg-sky/20 p-4">
            <p className="text-base text-gray">敬請期待</p>
          </div>
        </div>

        {/* 企業講座 */}
        <div className="mt-8 rounded-2xl bg-white/50 p-6 shadow-md sm:p-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💼</span>
            <h2 className="text-2xl font-bold text-aqua">企業講座</h2>
          </div>
          <div className="mt-6 rounded-xl bg-sky/20 p-4">
            <p className="text-base text-gray">敬請期待</p>
          </div>
        </div>

        {/* 企業參訪 */}
        <div className="mt-8 rounded-2xl bg-white/50 p-6 shadow-md sm:p-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏢</span>
            <h2 className="text-2xl font-bold text-aqua">企業參訪</h2>
          </div>
          <div className="mt-6 space-y-4">
            {/* Google 企業參訪 */}
            <div className="rounded-xl bg-aqua/10 p-5">
              <h3 className="text-lg font-bold text-aqua">Google</h3>
              <p className="mt-2 text-base leading-relaxed text-gray">
                參訪 Google 台灣辦公室，了解國際科技公司的企業文化與工作環境。透過實地參訪，讓小隊員親身體驗頂尖科技公司的創新氛圍，並與工程師交流，了解資訊產業的職涯發展與工作內容。
              </p>
            </div>

            {/* 其他企業參訪 */}
            <div className="rounded-xl bg-sky/20 p-5">
              <p className="text-base text-gray">敬請期待</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
