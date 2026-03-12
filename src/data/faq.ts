export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: "apply" | "fee" | "course" | "other";
};

export const faqs: FAQ[] = [
  {
    id: "who-can-apply",
    category: "apply",
    question: "誰可以報名參加營隊？",
    answer: "主要對象為高中職學生，對資訊科學或程式設計有興趣者皆可報名。",
  },
  {
    id: "need-experience",
    category: "course",
    question: "需要有程式基礎才能參加嗎？",
    answer:
      "不需要！課程會從零開始帶，同時也會提供進階挑戰題給有基礎的學員。",
  },
  {
    id: "fee-include",
    category: "fee",
    question: "報名費用包含哪些項目？",
    answer: "費用包含課程講義、材料費、午餐與保險，是否含住宿請以簡章為主。",
  },
];

