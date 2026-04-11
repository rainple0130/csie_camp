"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  activityTabs,
  academicActivities,
  generalActivities,
  isActivityTabId,
  visitSections,
  type ActivityTabId,
} from "@data/activitiesPageContent";
import { trackEvent } from "@utils/analytics";
import { getAssetPath } from "@utils/path";
import { CourseSplitSection } from "@components/courses";
import { Card, SectionHeader, IconCircleButton } from "@components/common";
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
  const measureRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const setTab = useCallback(
    (id: ActivityTabId) => {
      if (id !== activeTab) {
        trackEvent("activities_tab_click", {
          tab_id: id,
        });
      }
      setActiveTab(id);
      const next = new URLSearchParams(searchParams.toString());
      next.set(tabParam, id);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [activeTab, pathname, router, searchParams],
  );

  useEffect(() => {
    if (activeTab !== "visit") return;

    const computeHeights = () => {
      const next = visitSections.map((_, idx) => {
        const node = measureRefs.current[idx];
        return node?.offsetHeight ?? 0;
      });
      setSectionHeights(next);
    };

    // 切入 visit 分頁與圖片完成版面配置後都重算，避免高度被初始化為 0
    computeHeights();
    const rafId = window.requestAnimationFrame(computeHeights);
    const timeoutId = window.setTimeout(computeHeights, 250);

    const observer = new ResizeObserver(() => computeHeights());
    measureRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    window.addEventListener("resize", computeHeights);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener("resize", computeHeights);
    };
  }, [activeTab]);

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
                <Card key={index} title={activity.title} className="h-full">
                  <p className="text-base leading-relaxed text-gray">
                    {activity.description}
                  </p>
                </Card>
              ))}
            </div>
          </TabPanel>

          <TabPanel id="academic" activeTab={activeTab}>
            <p className="mb-6 text-base text-silver sm:text-lg">
              運用資訊思維，破解迎面而來的挑戰
            </p>
            <div className="grid gap-6 sm:px-10 lg:grid-cols-3 lg:px-0">
              {academicActivities.map((item, index) => (
                <Card key={index} title={item.title} className="h-full">
                  <p className="text-base leading-relaxed text-gray">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </TabPanel>

          <TabPanel id="visit" activeTab={activeTab}>
            <p className="mb-6 text-base text-silver sm:text-lg">
              與教授和業界人士交流，走進資訊的世界
            </p>
            <div className="space-y-10">
              {visitSections.map((section, sIdx) => {
                const defaultImage = "/background.png";
                const currentIndex = visitIndices[sIdx] ?? 0;
                const total = section.blocks.length;
                const current = section.blocks[currentIndex];
                const imgSrc =
                  current.type === "card"
                    ? current.imageSrc
                    : defaultImage;

                const templateBlock = section.blocks.reduce((best, block) => {
                  const bestLength =
                    best.type === "card"
                      ? best.title.length + best.description.length + (best.siteUrl?.length ?? 0)
                      : 0;
                  const blockLength =
                    block.type === "card"
                      ? block.title.length + block.description.length + (block.siteUrl?.length ?? 0)
                      : 0;
                  return blockLength > bestLength ? block : best;
                }, section.blocks[0]);

                const templateImgSrc =
                  templateBlock.type === "card"
                    ? templateBlock.imageSrc
                    : defaultImage;

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
                    <SectionHeader emoji={section.emoji} title={section.title} />

                    {/* 以文字最多卡片作為該區塊高度範本（同寬量測，避免左右切換跳動） */}
                    <div className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10" aria-hidden>
                      <div
                        className="pt-8"
                        ref={(el) => {
                        measureRefs.current[sIdx] = el;
                        }}
                      >
                        <CourseSplitSection
                          imageSrc={templateImgSrc}
                          imageAlt={section.title}
                          imageSide="left"
                          title={templateBlock.type === "card" ? templateBlock.title : "More?"}
                          className="mt-0"
                          imageColumnWidth="34%"
                        >
                          {templateBlock.type === "card" ? (
                            <>
                              <p className="whitespace-pre-line">{templateBlock.description}</p>
                              {templateBlock.siteUrl && (
                                <a href={templateBlock.siteUrl} target="_blank" rel="noopener noreferrer">
                                  <p className="text-md font-bold text-orange mt-2">個人網站</p>
                                </a>
                              )}
                            </>
                          ) : (
                            <div className="whitespace-pre-line">
                              <p className="text-lg font-bold text-aqua">Coming Soon</p>
                            </div>
                          )}
                        </CourseSplitSection>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <IconCircleButton
                        aria-label={`${section.title} 上一則`}
                        onClick={goPrev}
                        disabled={total <= 1}
                      >
                        <LuChevronLeft className="h-6 w-6" aria-hidden />
                      </IconCircleButton>

                      <div
                        className="relative min-w-0 flex-1 pt-8"
                        style={
                          sectionHeights[sIdx] > 0
                            ? { height: `${sectionHeights[sIdx]}px` }
                            : undefined
                        }
                      >
                        <CourseSplitSection
                          imageSrc={imgSrc}
                          imageAlt={section.title}
                          imageSide="left"
                          title={current.type === "card" ? current.title : "More?"}
                          className="mt-0 h-full"
                          imageColumnWidth="34%"
                          contentClassName="min-w-0 h-full sm:justify-start"
                        >
                          {current.type === "card" ? (
                            <>
                              <p className="whitespace-pre-line">{current.description}</p>
                              {current.siteUrl && (
                                <a href={current.siteUrl} target="_blank" rel="noopener noreferrer">
                                  <p className="text-md font-bold text-orange mt-2">個人網站</p>
                                </a>
                              )}
                            </>
                          ) : (
                            <div className="whitespace-pre-line">
                              <p className="text-lg font-bold text-aqua">Coming Soon</p>
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

                      <IconCircleButton
                        aria-label={`${section.title} 下一則`}
                        onClick={goNext}
                        disabled={total <= 1}
                      >
                        <LuChevronRight className="h-6 w-6" aria-hidden />
                      </IconCircleButton>
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
