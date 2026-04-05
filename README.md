# CSIE Camp Website

本專案為 2026 臺大資訊營官方網站，採用 Next.js（App Router）與 TypeScript。

## 開發快速開始

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

打開 `http://localhost:3000` 進行開發。

首頁為 `src/app/page.tsx`，存檔會自動熱更新。

## 路徑別名與資料夾職責

本專案已設定 `tsconfig.json` 的 `baseUrl: src` 與以下別名：

```json
{
  "paths": {
    "@/*": ["*"],
    "@app/*": ["app/*"],
    "@components/*": ["components/*"],
    "@components": ["components/index.ts"],
    "@data/*": ["data/*"],
    "@data": ["data/index.ts"],
    "@utils/*": ["utils/*"],
    "@lib/*": ["lib/*"],
    "@features/*": ["features/*"]
  }
}
```

使用示例：

```ts
import { ActivitiesTabs } from "@components/activities";
import { campInfo } from "@data/campInfo";
import { getAssetPath } from "@utils/path";
```

目錄結構與職責：
- `src/app`：路由、layout、page、metadata（僅做畫面組裝與頁面專屬邏輯）
- `src/components`：可重用 UI 元件（視覺為主，盡量無業務邏輯）
- `src/components/common`：共用的通用元件（如 `Card`, `SectionHeader`, `IconCircleButton`）
- `src/data`：靜態資料與型別
- `src/utils`：純函式工具，不依賴執行環境（Node/Browser 皆可）
- `src/lib`：預留給環境相依封裝（如 fetch/SDK/analytics/init 等）
- `public`：靜態資源（圖片等）

## UI/SEO 一致性

- 共用 UI 抽象：
  - `Card`：卡片容器與標題
  - `SectionHeader`：區塊標題（支援 emoji）
  - `IconCircleButton`：圓形 icon 按鈕
- 全站 SEO/版頭版尾集中於 `src/app/layout.tsx`：
  - 標題模板、`metadataBase`、Open Graph、`/favicon.ico`

## 常見問題

- 圖片路徑
  - 請以從 `public` 起算的絕對路徑撰寫（如 `/photos/*.jpg`），並透過 `getAssetPath` 包裝，以便未來若導入 CDN/basePath 可集中調整。
- 新增頁面
  - 在 `src/app/<route>/page.tsx` 建立；SEO 會繼承 `layout` 的 metadata，僅需額外覆寫必要欄位。
- 匯入路徑錯誤
  - 確保 `tsconfig.json` 的 `baseUrl: "src"` 存在，且 IDE 有重新載入 TS 設定。

## 部署

本專案支援 GitHub Pages；細節請見 `GITHUB_PAGES_SETUP.md`。

## 進一步了解

Next.js：

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
