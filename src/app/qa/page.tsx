import { faqs } from "../../data/faq";
import { SectionTitle } from "../../components/common/SectionTitle";

type GroupedFAQs = {
  title: string;
  key: "apply" | "fee" | "course" | "other";
};

const groups: GroupedFAQs[] = [
  { key: "apply", title: "報名與資格" },
  { key: "fee", title: "費用與住宿" },
  { key: "course", title: "課程內容" },
  { key: "other", title: "其他" },
];

export default function QAPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <SectionTitle
          title="常見問題（FAQ）"
          subtitle="如果還是找不到答案，歡迎直接寫信給我們"
        />

        <div className="space-y-6">
          {groups.map((group) => {
            const groupFaqs = faqs.filter((f) => f.category === group.key);
            if (groupFaqs.length === 0) return null;
            return (
              <div key={group.key}>
                <h3 className="mb-2 text-sm font-semibold text-slate-800">
                  {group.title}
                </h3>
                <div className="space-y-2">
                  {groupFaqs.map((faq) => (
                    <details
                      key={faq.id}
                      className="group rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                    >
                      <summary className="cursor-pointer list-none">
                        <span className="mr-2 text-sky-700">Q.</span>
                        {faq.question}
                      </summary>
                      <p className="mt-2 pl-6 text-slate-700">
                        <span className="mr-2 text-emerald-700">A.</span>
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
          還有其他問題嗎？歡迎來信 csiecamp@example.com，我們會儘快回覆你。
        </div>
      </section>
    </div>
  );
}

