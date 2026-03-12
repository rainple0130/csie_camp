import { activities } from "../../data/activities";
import { SectionTitle } from "../../components/common/SectionTitle";

export default function ActivitiesPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <SectionTitle
          title="活動介紹"
          subtitle="不只有課程，還有豐富多元的營隊活動"
        />

        <p className="mb-6 text-sm text-slate-700">
          營期間會搭配破冰、晚會與導覽等活動，讓大家在輕鬆的氛圍中認識彼此。
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <h3 className="text-base font-semibold">{activity.title}</h3>
              <p className="mt-1 text-sm text-slate-700">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

