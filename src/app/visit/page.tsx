"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** 已合併至活動介紹頁；靜態匯出無法使用 server redirect，改為客戶端導向 */
export default function VisitRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/activities?tab=visit");
  }, [router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-ivory text-gray">
      <p className="text-sm text-silver">正在前往活動介紹…</p>
    </div>
  );
}
