 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { campInfo } from "../data/campInfo";
import { campDates } from "../data/dates";
import { getAssetPath } from "../utils/path";

const highlightPhotos = [
  { src: "/photos/lucky.jpg", alt: "歷屆營隊花絮 1" },
  { src: "/photos/together.JPG", alt: "歷屆營隊花絮 2" },
  { src: "/photos/mario.jpg", alt: "歷屆營隊花絮 3" },
  { src: "/photos/challenge.jpg", alt: "歷屆營隊花絮 4" },
  { src: "/photos/leader.jpg", alt: "歷屆營隊花絮 5" },
  // TODO: 將上述路徑換成實際花絮照片（放在 public/ 底下）
];

export default function Home() {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (highlightPhotos.length <= 1) return;
    const id = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % highlightPhotos.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const currentPhoto = highlightPhotos[photoIndex];

  return (
    <div className="min-h-screen text-foreground">
      {/* Hero：固定背景大圖 + 浮空日期與立刻報名 */}
      <section
        className="relative lg:bg-[length:70%_auto] bg-[length:90%_auto] sm:bg-right bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `url(${getAssetPath("/background.png")})`,
        }}
      >
        <div className="relative z-10 flex min-h-screen max-w-2xl flex-col justify-center px-4 sm:pt-0 pt-20">
          <img src={getAssetPath("/title.png")} alt="Title" className="w-3/4 sm:w-3/4 md:w-7/8" />
          <p className="ml-5 sm:ml-10 text:md xs:text-xl sm:text-2xl font-bold text-gray sm:-translate-y-10 -translate-y-5">
            {campInfo.period}
          </p>
          <Link
            href={campInfo.formUrl}
            className="rounded-10 bg-aqua ml-10 mr-auto px-4 py-2.5 text:md xs:text-xl sm:text-2xl font-bold text-gray shadow-md transition-all duration-300 ease-out hover:scale-105 hover:bg-orange hover:text-white"
          >
            立刻報名
          </Link>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl bg-ivory/30 px-4 py-8 mb-10 shadow-xl backdrop-blur-md sm:px-8">
            {/* 第一 row：左花絮輪播、右基本資訊 */}
            <div className="grid gap-8 md:grid-cols-2 items-center">
              {/* 左：歷年花絮簡易輪播 */}
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-2xl bg-silver/10">
                  <div className="aspect-video w-full">
                    {highlightPhotos.map((photo, index) => (
                      <div
                        key={photo.src + index}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                          index === photoIndex ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {/* 可以換成 next/image，如果之後有實際照片 */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getAssetPath(photo.src)}
                          alt={photo.alt}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {highlightPhotos.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`切換到第 ${index + 1} 張照片`}
                        className={`h-1.5 rounded-full transition-all ${
                          index === photoIndex
                            ? "w-6 bg-aqua"
                            : "w-2 bg-silver/60"
                        }`}
                        onClick={() => setPhotoIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 右：營隊基本資訊 */}
              <div className="space-y-3 text-lg text-gray">
                <dl className="space-y-2">
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 font-semibold">
                      日期
                    </dt>
                    {campInfo.period}
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0  font-semibold">
                      地點
                    </dt>
                    {campInfo.location}
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0  font-semibold">
                      對象
                    </dt>
                    {campInfo.targetAudience}
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0  font-semibold">
                      住宿
                    </dt>
                    美亞商旅 臺北市中正區忠孝西路一段 50 號
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0  font-semibold">
                      費用
                    </dt>
                    一般生 13000 / 清寒生 6500
                  </div>
                </dl>
              </div>
            </div>

            {/* 第二 row：其他區塊連結 */}
            <div className="mt-10 border-t border-silver/40 pt-6 flex flex-wrap gap-3 text-md items-center">
              <p className="text-sm font-semibold tracking-wide text-gray/80">
                想先了解更多？
              </p>
              <Link
                href="/activities"
                className="rounded-full bg-aqua/30 px-4 py-2 text-gray transition-colors hover:bg-aqua/50"
              >
                活動介紹
              </Link>
              <Link
                href="/courses"
                className="rounded-full bg-aqua/30 px-4 py-2 text-gray transition-colors hover:bg-aqua/50"
              >
                課程介紹
              </Link>
              <Link
                href="/apply"
                className="rounded-full bg-aqua/30 px-4 py-2 text-gray transition-colors hover:bg-aqua/50"
              >
                報名流程
              </Link>
              <Link
                href="/qa"
                className="rounded-full bg-aqua/30 px-4 py-2 text-gray transition-colors hover:bg-aqua/50"
              >
                常見問題 FAQ
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
