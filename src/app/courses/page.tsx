import { CourseSplitSection } from "../../components/courses/CourseSplitSection";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-ivory text-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray sm:text-4xl">課程介紹</h1>
        <p className="mt-2 text-lg text-silver">從基礎到進階，循序漸進進入資訊系的世界</p>

        <CourseSplitSection
          imageSrc="/courses/python.png"
          imageAlt="課程簡介"
          imageSide="left"
          title="課程簡介"
        >
          <p>
            Python 是一款非常適合初學者入門，能快速上手並廣泛使用的程式語言。我們安排了數堂課程，讓小隊員熟悉
            Python 的基礎語法。並且在課程後設置了 challenge 活動，讓小隊員運用所學、做出一個屬於自己的小專案，寫出可以自己玩遊戲的遊戲
            AI，成就感滿滿～
          </p>
        </CourseSplitSection>

        <CourseSplitSection
          imageSrc="/courses/teaching.jpg"
          imageAlt="課程內容"
          imageSide="right"
          title="課程內容"
        >
          <p>
            課程內容涵蓋 Python 的基礎語法，如：輸入輸出、變數、資料型別、流程控制、函式⋯⋯等等。這些基本語法雖然簡單但是特別強大，可以讓電腦做出我們心中所想，進而讓我們設計出一支遊戲
            AI！
          </p>
        </CourseSplitSection>

        <CourseSplitSection
          imageSrc="/courses/ta.jpg"
          imageAlt="實作與遊戲主題課程"
          imageSide="left"
          title="教學方式"
        >
          <p>
            我們的課程採取「做中學、學中做」的方法。講師講解基本語法時，會不時穿插實作練習，並有專業助教團隊隨時幫小隊員解惑。講師群精心設計的主題也能讓小隊員將程式碼與實體世界的運作相互連結、幫助大家更快上手。
          </p>
          <div className="mt-6 grid gap-0 sm:grid-cols-2">
            <div className="bg-orange/10 p-4 sm:rounded-l-xl sm:rounded-r-none rounded-t-xl sm:rounded-b-none">
              <p className="text-sm font-semibold text-orange">實作練習</p>
              <p className="mt-1 text-sm text-gray">講師講解時穿插實作，立即應用所學</p>
            </div>
            <div className="bg-aqua/10 p-4 sm:rounded-r-xl sm:rounded-l-none rounded-b-xl sm:rounded-t-none">
              <p className="text-sm font-semibold text-aqua">助教協助</p>
              <p className="mt-1 text-sm text-gray">專業助教團隊隨時為小隊員解惑</p>
            </div>
          </div>
        </CourseSplitSection>

        <CourseSplitSection
          imageSrc="/courses/challenge.jpg"
          imageAlt="Challenge 活動實作"
          imageSide="right"
          title="Challenge 活動"
        >
          <p>
            課程最後還有一個 challenge 活動，各個小隊需要針對我們提供的遊戲，利用課堂所學撰寫出一支遊戲
            AI。在過程中，小隊員們將發展出與他人溝通、共同合作的能力，並且培養出「系統化解決問題的邏輯思維」，讓大家往後面對日常生活中的問題時，可以善用這些能力。
          </p>
          <div className="mt-6 rounded-xl bg-aqua/10 p-4">
            <p className="text-sm font-semibold text-aqua">活動目標</p>
            <ul className="mt-2 space-y-1 text-sm text-gray">
              <li className="flex items-start gap-2">
                <span className="text-aqua">•</span>
                <span>運用課堂所學撰寫遊戲 AI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aqua">•</span>
                <span>培養團隊合作與溝通能力</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aqua">•</span>
                <span>建立系統化解決問題的邏輯思維</span>
              </li>
            </ul>
          </div>
        </CourseSplitSection>
      </div>
    </div>
  );
}
