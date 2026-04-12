import type { Metadata } from "next";
import { ApplyPageClient } from "@components/apply/ApplyPageClient";

export const metadata: Metadata = {
  title: "報名資訊",
  description:
    "2026 臺大資訊營報名時程、費用說明與完整流程，包含錄取公告與繳費規範。",
};

export default function ApplyPage() {
  return <ApplyPageClient />;
}

