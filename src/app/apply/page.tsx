"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { campDates } from "../../data/dates";
import { campInfo } from "../../data/campInfo";

type TimelinePhase = "before" | "apply" | "review" | "announce" | "payment" | "after";

export default function ApplyPage() {
  const [currentPhase, setCurrentPhase] = useState<TimelinePhase>("before");
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0); // 當前已完成的節點索引 (0, 1, 2)
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    const updateTimeline = () => {
      const now = new Date();
      const applyStart = new Date(campDates.applyStart);
      const applyEnd = new Date(campDates.applyEnd);
      const resultAnnounce = new Date(campDates.resultAnnounce);

      let phase: TimelinePhase = "before";
      let progressValue = 0;
      let stepIndex = 0; // 當前已完成的節點索引

      if (now < applyStart) {
        phase = "before";
        progressValue = 0;
        stepIndex = 0;
      } else if (now >= applyStart && now < applyEnd) {
        phase = "apply";
        const total = applyEnd.getTime() - applyStart.getTime();
        const elapsed = now.getTime() - applyStart.getTime();
        progressValue = 25 + (elapsed / total) * 25; // 0-25% -> 25-50%
        stepIndex = 1; // 報名開始已完成

        // 計算剩餘時間
        const remaining = applyEnd.getTime() - now.getTime();
        setTimeRemaining({
          days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
          hours: Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
        });
      } else if (now >= applyEnd && now < resultAnnounce) {
        phase = "review";
        const total = resultAnnounce.getTime() - applyEnd.getTime();
        const elapsed = now.getTime() - applyEnd.getTime();
        progressValue = 50 + (elapsed / total) * 25; // 50-75%
        stepIndex = 2; // 報名開始、報名截止已完成
        setTimeRemaining(null);
      } else {
        phase = "after";
        progressValue = 100;
        stepIndex = 3; // 所有節點都已完成
        setTimeRemaining(null);
      }

      setCurrentPhase(phase);
      setProgress(Math.min(100, Math.max(0, progressValue)));
      setCurrentStepIndex(stepIndex);
    };

    updateTimeline();
    const interval = setInterval(updateTimeline, 60000); // 每分鐘更新一次
    return () => clearInterval(interval);
  }, []);

  const timelineSteps = [
    { label: "報名開始", date: campDates.applyStart },
    { label: "報名截止", date: campDates.applyEnd },
    { label: "錄取名單", date: campDates.resultAnnounce },
  ];

  const sessions = [
    { label: "開放報名", phase: "apply" },
    { label: "審查作業", phase: "review" },
  ];

  return (
    <div className="min-h-screen bg-ivory text-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray sm:text-4xl">報名資訊</h1>

        {/* 橫向進度條 */}
        <div className="mt-10">
          {/* 兩個 session 標籤（在進度條上方） */}
          <div className="-mb-1.5 mx-10 flex justify-between">
            {sessions.map((session, index) => {
              // 根據 currentStepIndex 判斷 session 是否活躍
              // index 0 (開放報名): stepIndex >= 1 (報名開始後)
              // index 1 (審查作業): stepIndex >= 2 (報名截止後)
              const isActive =
                currentPhase === session.phase ||
                (index === 0 && currentStepIndex >= 1) ||
                (index === 1 && currentStepIndex >= 2);

              return (
                <div
                  key={session.label}
                  className="flex-1 text-center"
                  style={{ marginLeft: index > 0 ? "8.33%" : 0 }}
                >
                  <p
                    className={`text-xl font-bold transition-all ${
                      isActive ? "text-aqua" : "text-silver"
                    }`}
                  >
                    {session.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative">
            {/* 背景線 */}
            <div className="absolute top-6 left-0  right-0 mx-7 h-1 bg-silver/30 rounded-full" />

            {/* 進度條（會隨時間滑動） */}
            <div
              className="absolute top-5.75 left-0 h-1.5 mx-7 bg-aqua rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />

            {/* 三個時間點 */}
            <div className="relative flex justify-between top-4">
              {timelineSteps.map((step, index) => {
                // 根據 currentStepIndex 判斷節點是否已完成
                // index 0 (報名開始): stepIndex >= 1
                // index 1 (報名截止): stepIndex >= 2
                // index 2 (錄取名單): stepIndex >= 3
                const isCompleted = currentStepIndex > index;

                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`h-5 w-5 rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-aqua border-aqua"
                          : "bg-ivory border-silver"
                      }`}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-xs font-semibold text-gray">{step.label}</p>
                      <p className="mt-1 text-xs text-silver">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 開放報名期間顯示剩餘時間 */}
          {currentPhase === "apply" && timeRemaining && (
            <div className="mt-6 text-center">
              <p className="text-sm text-silver">報名剩餘時間</p>
              <p className="mt-2 text-2xl font-bold text-orange">
                {timeRemaining.days} 天 {timeRemaining.hours} 小時{" "}
                {timeRemaining.minutes} 分鐘
              </p>
            </div>
          )}
        </div>

        {/* 兩欄：費用說明與報名流程 */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* 左欄：費用說明 */}
          <div className="space-y-6 rounded-2xl bg-white/50 p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray">費用說明</h2>
            <div className="space-y-4 text-sm text-gray">
              <div>
                <p className="font-semibold text-aqua">報名費用</p>
                <p className="mt-1 text-gray">
                  一般生 13000 元 / 清寒生 6500 元，包含：
                </p>
                <ul className="list-inside list-disc pl-4">
                  <li>七天六夜住宿</li>
                  <li>三餐與宵夜</li>
                  <li>資訊營紀念品</li>
                  <li>保險、材料費......</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-aqua">退費規範</p>
                <p className="mt-1 text-gray">詳見報名表單內容</p>
                <ul className="list-inside list-disc text-gray pl-4">
                  <li>2026/05/31（日）前告知，退還 90%</li>
                  <li>2026/06/14（日）前告知，退還 70%</li>
                  <li>2026/06/28（日）前告知，退還 40%</li>
                  <li>2026/07/05（日）前告知，退還 10%</li>
                  <li>2026/07/06（一）後告知，恕不退款</li>
                </ul>
                <p className="mt-1 text-gray">營期因不可抗力因素退出，依天數計算退還費用</p>
              </div>
            </div>
          </div>

          {/* 右欄：報名流程 */}
          <div className="space-y-6 rounded-2xl bg-white/50 p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray">報名流程</h2>
            <ol className="space-y-4 text-sm text-gray">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aqua font-semibold text-gray">
                  1
                </span>
                <span>填寫線上報名表單（含<Link href="https://drive.google.com/drive/folders/19fikrpGByvcjhE0HIVS_tlewgUuvFkn8?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-aqua font-semibold">紙本資料掃描</Link>）</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aqua font-semibold text-gray">
                  2
                </span>
                <span>等待錄取結果公告</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aqua font-semibold text-gray">
                  3
                </span>
                <span>收到錄取通知後，於期限內完成繳費</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aqua font-semibold text-gray">
                  4
                </span>
                <span>繳費成功即完成報名，營前會寄送行前通知</span>
              </li>
            </ol>

            {/* Google Form 按鈕 */}
            <div className="mt-8 rounded-xl bg-sky/30 p-4">
              <p className="text-md font-semibold text-gray">報名表單</p>
              <p className="mt-1 text-sm text-gray">
                錄取標準由手寫報名表決定，與填寫時間無關，請詳細閱讀表單內容與撰寫報名表
              </p>
              <Link
                href={campInfo.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-aqua px-6 py-3 text-base font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-orange"
              >
                前往 Google 表單報名
              </Link>
            </div>
          </div>
        </div>

        {/* 聯絡資訊 */}
        <div className="mt-10 text-center text-xs text-silver">
          報名相關問題，歡迎來信 {campInfo.email} 與籌備團隊聯絡。
        </div>
      </div>
    </div>
  );
}

