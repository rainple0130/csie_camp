import type { Metadata } from "next";
import { CourseSplitSection } from "@components/courses";
import { donateSponsorItems } from "@data/donatePageContent";

export const metadata: Metadata = {
  title: "贊助內容",
  description:
    "查看 2026 臺大資訊營的五個贊助商內容卡片，了解各項合作與曝光方式。",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-ivory text-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray sm:text-4xl">贊助廠商</h1>
        <p className="mt-2 text-lg text-silver">感謝以下廠商的贊助，讓我們活動進行得更加順利~</p>

        <div className="mt-8 space-y-8">
          {donateSponsorItems.map((item, index) => (
            <CourseSplitSection
              key={item.title}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              imageSide={index % 2 === 0 ? "left" : "right"}
              title={item.title}
              imageColumnWidth="34%"
            >
              <p className="whitespace-pre-wrap">{item.description}</p>
            </CourseSplitSection>
          ))}
        </div>
      </div>
    </div>
  );
}