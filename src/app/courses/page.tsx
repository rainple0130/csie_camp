import { courses } from "../../data/courses";
import { SectionTitle } from "../../components/common/SectionTitle";

export default function CoursesPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <SectionTitle
          title="課程介紹"
          subtitle="從基礎到進階，循序漸進體驗資工學習"
        />

        <p className="mb-6 text-sm text-slate-700">
          營期共數天，課程內容將依實際規劃微調，下列為範例時程供參考。
        </p>

        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-medium text-white">
                    {course.day}
                  </span>
                  <span className="text-xs text-slate-500">
                    {course.time}
                  </span>
                </div>
                <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-700">
                  {course.level === "intro" ? "入門" : "進階"}
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold">{course.title}</h3>
              <p className="mt-1 text-sm text-slate-700">{course.description}</p>
              <p className="mt-1 text-xs text-slate-500">
                授課講師：{course.lecturer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

