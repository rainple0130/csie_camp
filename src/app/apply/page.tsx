import Link from "next/link";
import { campDates } from "../../data/dates";
import { SectionTitle } from "../../components/common/SectionTitle";

export default function ApplyPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <SectionTitle title="報名資訊" subtitle="了解報名流程與重要日期" />
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            目前報名狀態：報名期間內（請以實際公告為主）
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-sm text-slate-700">
              <h3 className="text-base font-semibold">重要日期</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>報名開始：{campDates.applyStart}</li>
                <li>報名截止：{campDates.applyEnd}</li>
                <li>錄取公告：{campDates.resultAnnounce}</li>
                <li>繳費截止：{campDates.paymentDeadline}</li>
              </ul>

              <h3 className="mt-6 text-base font-semibold">報名資格</h3>
              <p>高中職學生，對資訊科學或程式設計有興趣者。</p>

              <h3 className="mt-6 text-base font-semibold">名額與費用</h3>
              <p>預計招收 60 名學員，費用與是否含住宿請以簡章為主。</p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <h3 className="text-base font-semibold">報名流程</h3>
              <ol className="list-decimal space-y-1 pl-5">
                <li>填寫線上報名表單</li>
                <li>等待錄取結果公告</li>
                <li>收到錄取通知後，於期限內完成繳費</li>
                <li>繳費成功即完成報名，營前會寄送行前通知</li>
              </ol>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium text-slate-600">報名表單</p>
                <p className="mt-1 text-sm text-slate-700">
                  請確認仔細閱讀簡章及注意事項後再填寫表單。
                </p>
                <Link
                  href="https://forms.gle/example"
                  target="_blank"
                  className="mt-4 inline-flex rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white hover:bg-sky-700"
                >
                  前往 Google 表單報名
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 text-xs text-slate-500">
            若報名相關問題，歡迎來信 csiecamp@example.com 與籌備團隊聯絡。
          </div>
        </div>
      </section>
    </div>
  );
}

