import type { Metadata } from "next";
import { campInfo } from "@data/campInfo";

export const metadata: Metadata = {
  title: "常見問題",
  description:
    "整理 2026 臺大資訊營常見問題，包含報名、課程、住宿與繳費資訊，快速找到參加前需要知道的重點。",
};

const faqCategories = [
  {
    emoji: "🌴",
    title: "報名",
    questions: [
      {
        question: "錄取標準會是什麼呢？",
        answer:
          "錄取標準主要是依據手寫報名表單上的內容決定喔！與填表單的時間完全無關，所以同學們要認真花心思撰寫手寫報名表單，讓我們看到你需要且適合這個營隊！另外，資料錯誤或不齊全也會影響錄取資格，還請同學多加注意！",
      },
      {
        question: "為什麼會需要上傳生活照和臉書連結呢？",
        answer:
          "生活照的部分主要是方便同學們錄取能後讓隊輔哥哥姊姊能及早認識你們，才不會營隊開始時認不出自己的小隊員！臉書連結則是為了方便聯絡和創立小隊群組，過去幾年的經驗讓我們覺得各位同學都太難聯絡到了啊！",
      },
      {
        question: "臺大資訊營是臺大資工系學生辦的嗎？",
        answer: "是的！臺大資訊營（台大資訊營）就是臺大資工（台大資工）學生辦的營隊喔！",
      }
    ],
  },
  {
    emoji: "🌴",
    title: "課程",
    questions: [
      {
        question: "請問我不會寫程式的話可以報名這個營隊嗎？",
        answer:
          "可以！我們的營隊課程內容會從基礎教起，只要對資訊領域有興趣都很歡迎參加！",
      },
      {
        question: "課程內容會上些什麼呢？",
        answer:
          "讓大家用 Python 寫出一個遊戲的 AI，在遊戲製作過程中會讓大家同時學會 Python 的語法！可以參考上方課程介紹頁面，裡面有更詳細的課程內容喔！",
      },
    ],
  },
  {
    emoji: "🌴",
    title: "住宿",
    questions: [
      {
        question: "今年的住宿地點是哪裡呢？",
        answer:
          "今年的住宿地點是 美亞商旅（臺北市中正區忠孝西路一段50號）",
      },
      {
        question: "請問一定要住宿嗎？",
        answer: "是的！營期間的七天六夜都要住宿喔～",
      },
      {
        question: "營期間要怎麼前往飯店呢？",
        answer: "我們都會安排專車接送，把大家從德田館載到住宿地點！",
      },
      {
        question: "請問可以選擇室友嗎？",
        answer: "房間的部分會由我們來分配！",
      },
    ],
  },
  {
    emoji: "🌴",
    title: "繳費",
    questions: [
      {
        question: "請問何時需要繳費呢？",
        answer:
          "在錄取結果公佈時（2026 / 05 / 18 前）會將繳費資訊連同錄取通知一同寄送到大家報名表單上留的電子郵件信箱中，所以大家到時候要注意自己的信箱喔！",
      },
    ],
  },
];

export default function QAPage() {
  return (
    <div className="min-h-screen bg-ivory text-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray sm:text-4xl">常見問題</h1>
        <p className="mt-2 text-lg text-silver">
          如果還是找不到答案，歡迎直接寫信給我們
        </p>

        <div className="mt-10 space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="rounded-2xl bg-white/50 p-6 shadow-md sm:p-8">
              <div className="flex items-center gap-3 border-b border-silver/30 pb-4">
                <span className="text-2xl">{category.emoji}</span>
                <h2 className="text-2xl font-bold text-aqua">{category.title}</h2>
              </div>

              <div className="mt-6 space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <details
                    key={faqIndex}
                    className="group rounded-xl bg-sky/10 p-4 transition-all hover:bg-sky/20"
                  >
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">📮</span>
                        <span className="flex-1 text-base font-semibold text-gray group-hover:text-aqua transition-colors">
                          {faq.question}
                        </span>
                      </div>
                    </summary>
                    <div className="mt-3 ml-8 border-l-2 border-aqua pl-4">
                      <p className="text-base leading-relaxed text-gray">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-aqua/10 p-6 text-center">
          <p className="text-base text-gray">
            還有其他問題嗎？歡迎來信{" "}
            <a
              href={`mailto:${campInfo.email}`}
              className="font-semibold text-aqua hover:text-orange transition-colors"
            >
              {campInfo.email}
            </a>
            ，我們會儘快回覆你。
          </p>
        </div>
      </div>
    </div>
  );
}

