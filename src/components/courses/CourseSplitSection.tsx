import type { ReactNode } from "react";
import { getAssetPath } from "../../utils/path";
import styles from "./CourseSplitSection.module.css";

type CourseSplitSectionProps = {
  imageSrc: string;
  imageAlt: string;
  /** 寬度 ≥ sm 時圖在左或右；未滿 sm 時直向、圖在上 */
  imageSide: "left" | "right";
  title: string;
  children: ReactNode;
  /** 套在外層 section，例如限制整卡高度：`max-h-[28rem] flex flex-col` 並搭配內文區 scroll */
  className?: string;
  /**
   * 若未傳：桌機版圖片欄高度與文字欄同高（由 Grid 列高決定）。
   * 若有傳：圖片區固定高度（例 `sm:h-52`），圖片以 object-cover 填滿。
   */
  imageHeightClassName?: string;
  /**
   * 寬度 ≥ sm 時圖片欄寬度（CSS 長度），例如 `40%`、`min(20rem, 38%)`
   * 會寫入 --split-img-col，文字欄為剩餘空間。
   */
  imageColumnWidth?: string;
  /** 加在圖片外層的額外 class（裁切、陰影等） */
  imageColumnClassName?: string;
  /** 文字欄；整卡設 max-h 時可設 `sm:min-h-0 sm:overflow-y-auto` 讓內文捲動 */
  contentClassName?: string;
};

export function CourseSplitSection({
  imageSrc,
  imageAlt,
  imageSide,
  title,
  children,
  className,
  imageHeightClassName,
  imageColumnWidth = "30%",
  imageColumnClassName,
  contentClassName,
}: CourseSplitSectionProps) {
  const isLeft = imageSide === "left";
  const fixedImageHeight = imageHeightClassName != null && imageHeightClassName !== "";

  const clipClasses = isLeft
    ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_92%)] sm:[clip-path:polygon(0_0,76%_0,100%_100%,0_100%)]"
    : "[clip-path:polygon(0_0,100%_0,100%_100%,0_92%)] sm:[clip-path:polygon(24%_0,100%_0,100%_100%,0_100%)]";

  return (
    <section
      className={`mt-8 overflow-hidden rounded-2xl bg-white/50 shadow-md ${className ?? ""}`}
      style={{ ["--split-img-col" as string]: imageColumnWidth }}
    >
      <div
        className={`${styles.row} min-h-0 ${
          isLeft ? styles.rowLeft : styles.rowRight
        }`}
      >
        <div
          className={`${styles.imageCell} isolate min-h-0 sm:min-h-0 max-sm:h-60 ${
            fixedImageHeight
              ? `sm:self-center ${imageHeightClassName ?? ""}`
              : "sm:h-full sm:self-stretch"
          } ${!isLeft ? styles.imageRight : ""} ${clipClasses} ${imageColumnClassName ?? ""}`}
        >
          <img
            src={getAssetPath(imageSrc)}
            alt={imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div
          className={`min-w-0 flex flex-1 flex-col justify-center px-6 py-6 sm:px-8 sm:py-8 ${
            isLeft
              ? "sm:-ml-[12%] sm:pl-[14%]"
              : `sm:-mr-[12%] sm:pr-[14%] ${styles.contentRight}`
          } ${contentClassName ?? ""}`}
        >
          <h2 className="text-2xl font-bold text-aqua">{title}</h2>
          <div className="mt-4 text-base leading-relaxed text-gray sm:text-lg">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
