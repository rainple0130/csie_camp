"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  activityTabs,
  academicActivities,
  generalActivities,
  isActivityTabId,
  visitSections,
  type ActivityTabId,
} from "../../data/activitiesPageContent";
import { getAssetPath } from "../../utils/path";
import { CourseSplitSection } from "../courses/CourseSplitSection";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const tabParam = "tab";

export function ActivitiesTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams.get(tabParam);
  const initialTab = useMemo<ActivityTabId>(() => {
    return isActivityTabId(tabFromUrl) ? tabFromUrl : "general";
  }, [tabFromUrl]);

  const [activeTab, setActiveTab] = useState<ActivityTabId>(initialTab);
  const [visitIndices, setVisitIndices] = useState<number[]>(
    () => visitSections.map(() => 0),
  );
  const [sectionHeights, setSectionHeights] = useState<number[]>(
    () => visitSections.map(() => 0),
  );

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const setTab = useCallback(
    (id: ActivityTabId) => {
      setActiveTab(id);
      const next = new URLSearchParams(searchParams.toString());
      next.set(tabParam, id);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const computeHeights = () => {
      const nextHeights = visitSections.map((section) => {
        // 僅量測內容欄高度，圖片高度將自動隨 Grid 列高等同於內容欄
        const contentNodes = Array.from(
          document.querySelectorAll<HTMLElement>(
            `[data-section="${section.title}"][data-measure="1"] .visit-measure-content`,
          ),
        );
        const maxContent = contentNodes.reduce(
          (acc, el) => Math.max(acc, el.offsetHeight),
          0,
        );
        return maxContent;
      });
      setSectionHeights(nextHeights);
    };
    // 初次與視窗調整時重算
    computeHeights();
    window.addEventListener("resize", computeHeights);
    return () => window.removeEventListener("resize", computeHeights);
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray sm:text-4xl">活動介紹</h1>
        <div
          className="mt-8 grid grid-cols-3 gap-2 sm:gap-4"
          role="tablist"
          aria-label="活動類別"
        >
          {activityTabs.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`activity-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`activity-panel-${tab.id}`}
                tabIndex={0}
                onClick={() => setTab(tab.id)}
                className={`group relative overflow-hidden rounded-2xl text-left shadow-md transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua ${
                  selected
                    ? "ring-2 ring-aqua ring-offset-2 ring-offset-ivory"
                    : "hover:ring-2 hover:ring-silver/50"
                }`}
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                  <Image
                    src={getAssetPath(tab.imageSrc)}
                    alt={tab.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 33vw, 400px"
                    priority={tab.id === "general"}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-gray/90 via-gray/30 to-transparent transition-opacity ${
                      selected ? "opacity-95" : "opacity-85"
                    }`}
                    aria-hidden
                  />
                  <span className="absolute bottom-0 left-0 right-0 px-2 py-2 text-center text-xs font-bold text-ivory sm:px-3 sm:py-3 sm:text-sm md:text-base">
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <TabPanel id="general" activeTab={activeTab}>
            <p className="mb-6 text-base text-silver sm:text-lg">
              在競爭與合作中，認識志同道合的夥伴
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {generalActivities.map((activity, index) => (
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
          </TabPanel>

          <TabPanel id="academic" activeTab={activeTab}>
            <p className="mb-6 text-base text-silver sm:text-lg">
              運用資訊思維，破解迎面而來的挑戰
            </p>
            <div className="grid gap-6 sm:px-10 lg:grid-cols-3 lg:px-0">
              {academicActivities.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white/50 p-6 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <h2 className="text-xl font-bold text-aqua">{item.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-gray">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel id="visit" activeTab={activeTab}>
            <p className="mb-6 text-base text-silver sm:text-lg">
              與教授和業界人士交流，走進資訊的世界
            </p>
            <div className="space-y-10">
              {visitSections.map((section, sIdx) => {
                const sectionFallbackImage: Record<string, string> = {
                  企業參訪: "/photos/leader.jpg",
                  教授講座: "/courses/teaching.jpg",
                  職人講座: "/courses/challenge.jpg",
                };
                const currentIndex = visitIndices[sIdx] ?? 0;
                const total = section.blocks.length;
                const current = section.blocks[currentIndex];
                const imgSrc =
                  current.type === "card"
                    ? current.imageSrc
                    : sectionFallbackImage[section.title] ?? "/photos/leader.jpg";

                const goPrev = () => {
                  setVisitIndices((prev) => {
                    const next = prev.slice();
                    next[sIdx] = (currentIndex - 1 + total) % total;
                    return next;
                  });
                };
                const goNext = () => {
                  setVisitIndices((prev) => {
                    const next = prev.slice();
                    next[sIdx] = (currentIndex + 1) % total;
                    return next;
                  });
                };

                return (
                  <div key={section.title} className="relative">
                    <div className="mb-3 flex items-center gap-3 px-1">
                      <span className="text-3xl" aria-hidden>
                        {section.emoji}
                      </span>
                      <h2 className="text-2xl font-bold text-aqua">{section.title}</h2>
                    </div>

                    {/* 隱藏量測：渲染本分類所有卡片以取得最大高度（離開版面以避免任何重疊/佔位） */}
                    <div className="invisible fixed -left-[10000px] top-0 w-screen max-w-[1200px] opacity-0 pointer-events-none">
                      {section.blocks.map((b, i) => {
                        const measureImg =
                          b.type === "card" ? b.imageSrc : sectionFallbackImage[section.title] ?? "/photos/leader.jpg";
                        return (
                          <div
                            key={`m-${i}`}
                            data-section={section.title}
                            data-measure="1"
                            className="mb-4"
                          >
                            <CourseSplitSection
                              imageSrc={measureImg}
                              imageAlt={section.title}
                              imageSide="left"
                              title={b.type === "card" ? b.title : section.title}
                              imageColumnWidth="34%"
                              contentClassName="visit-measure-content"
                            >
                              {b.type === "card" ? (
                                <p className="whitespace-pre-line">{b.description}</p>
                              ) : (
                                <div className="flex min-h-[6rem] items-center justify-center">
                                  <p className="text-lg font-bold text-aqua">{b.text}</p>
                                </div>
                              )}
                            </CourseSplitSection>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`${section.title} 上一則`}
                        onClick={goPrev}
                        className={`inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-aqua/50 text-white shadow-md transition hover:bg-aqua ${
                          total > 1 ? "" : "opacity-0 pointer-events-none"
                        }`}
                        aria-hidden={total <= 1}
                        tabIndex={total > 1 ? 0 : -1}
                      >
                        <LuChevronLeft className="h-6 w-6" aria-hidden />
                      </button>

                      <div
                        className="relative min-w-0 flex-1"
                        style={
                          sectionHeights[sIdx] > 0
                            ? { minHeight: `${sectionHeights[sIdx]}px` }
                            : undefined
                        }
                      >
                        <CourseSplitSection
                          imageSrc={imgSrc}
                          imageAlt={section.title}
                          imageSide="left"
                          title={current.type === "card" ? current.title : section.title}
                          imageColumnWidth="34%"
                          contentClassName="min-w-0"
                        >
                          {current.type === "card" ? (
                            <p className="whitespace-pre-line">
                              {current.description}
                            </p>
                          ) : (
                            <div className="flex min-h-[6rem] items-center justify-center">
                              <p className="text-lg font-bold text-aqua">{current.text}</p>
                            </div>
                          )}
                        </CourseSplitSection>

                        {total > 1 && (
                          <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5">
                            {Array.from({ length: total }).map((_, di) => (
                              <span
                                key={di}
                                className={`h-2.5 w-2.5 rounded-full transition ${
                                  di === currentIndex
                                    ? "bg-aqua shadow-[0_0_0_2px_rgba(255,255,255,0.9)]"
                                    : "bg-white/70"
                                }`}
                                aria-hidden
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        aria-label={`${section.title} 下一則`}
                        onClick={goNext}
                        className={`inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-aqua/50 text-white shadow-md transition hover:bg-aqua ${
                          total > 1 ? "" : "opacity-0 pointer-events-none"
                        }`}
                        aria-hidden={total <= 1}
                        tabIndex={total > 1 ? 0 : -1}
                      >
                        <LuChevronRight className="h-6 w-6" aria-hidden />
                      </button>
                    </div>

                    {total > 1 ? null : <div className="h-2" aria-hidden />}
                  </div>
                );
              })}
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

function TabPanel({
  id,
  activeTab,
  children,
}: {
  id: ActivityTabId;
  activeTab: ActivityTabId;
  children: ReactNode;
}) {
  const hidden = activeTab !== id;
  return (
    <div
      role="tabpanel"
      id={`activity-panel-${id}`}
      aria-labelledby={`activity-tab-${id}`}
      hidden={hidden}
    >
      {children}
    </div>
  );
}
