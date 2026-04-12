import type { Metadata } from "next";
import { HomePageClient } from "@components/home/HomePageClient";

export const metadata: Metadata = {
  title: "首頁",
  description:
    "2026 臺大資訊營（台大資工營）官網，提供營隊日期、活動亮點、課程介紹與報名資訊。",
};

export default function Home() {
  return <HomePageClient />;
}
