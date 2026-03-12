export type Course = {
  id: string;
  day: string;
  time: string;
  title: string;
  description: string;
  lecturer: string;
  level: "intro" | "advanced";
};

export const courses: Course[] = [
  {
    id: "day1-am",
    day: "Day 1",
    time: "上午",
    title: "開營與資工系介紹",
    description: "認識資工系在學什麼、未來出路與系上資源。",
    lecturer: "系主任 / 助教群",
    level: "intro",
  },
  {
    id: "day1-pm",
    day: "Day 1",
    time: "下午",
    title: "程式設計入門：從零開始寫第一支程式",
    description: "用簡單例子帶你進入程式世界，沒有基礎也能跟上。",
    lecturer: "系上學長姐",
    level: "intro",
  },
  {
    id: "day2-am",
    day: "Day 2",
    time: "上午",
    title: "演算法與解題實戰",
    description: "用生活化例子理解演算法思維，體驗解題樂趣。",
    lecturer: "競程社學長姐",
    level: "advanced",
  },
];

