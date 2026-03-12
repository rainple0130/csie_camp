export type Activity = {
  id: string;
  title: string;
  description: string;
  category: "icebreak" | "demo" | "tour" | "night" | "other";
};

export const activities: Activity[] = [
  {
    id: "icebreak",
    title: "破冰與小隊時間",
    description: "透過團康遊戲快速認識同隊夥伴與學長姐。",
    category: "icebreak",
  },
  {
    id: "demo-day",
    title: "成果發表 Demo Day",
    description: "展示這幾天完成的作品，邀請師長及家長共同參與。",
    category: "demo",
  },
  {
    id: "campus-tour",
    title: "校園與系館導覽",
    description: "實際走訪資工系館與重要場館，感受大學生活氛圍。",
    category: "tour",
  },
  {
    id: "night-activity",
    title: "夜間主題活動",
    description: "輕鬆有趣的晚會或主題之夜，讓大家留下難忘回憶。",
    category: "night",
  },
];

