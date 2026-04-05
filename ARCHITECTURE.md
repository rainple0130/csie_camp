# CSIE Camp — 專案架構說明

本文件說明此 Next.js 專案的整體架構、目錄規範、匯入路徑別名、以及未來擴充建議，協助新進開發者快速上手並維護一致性。

## 技術棧
- Next.js (App Router)
- TypeScript（`strict: true`）
- Tailwind CSS

## 目錄結構（高階）
```
src/
  app/                # App Router：routing、layout、page、metadata
  components/         # 可重用 UI 元件（無副作用，盡量無業務邏輯）
    activities/
    courses/
    layout/
    common/
  data/               # 純資料（常數、靜態內容）
  utils/              # 純函式工具（無副作用、可測試）
  lib/                #（預留）需環境相依的封裝，例如：API client、browser-only utils
public/               # 靜態資源
```

說明：
- `components/*` 僅包含可重用的視覺元件。跨頁共用的布局與 UI 放在 `components/layout`、`components/common`。
- `data/*` 僅放靜態內容與型別，避免摻雜邏輯。
- `utils/*` 僅放純函式；若後續出現需要 `window`、`fetch`、或第三方 SDK 的封裝，請移到 `lib/*`。
- `app/*` 專注「路由與畫面組裝」，盡量不寫與路由無關的業務邏輯。

## 路徑別名
`tsconfig.json`：
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@app/*": ["app/*"],
      "@components/*": ["components/*"],
      "@data/*": ["data/*"],
      "@utils/*": ["utils/*"],
      "@lib/*": ["lib/*"],
      "@features/*": ["features/*"]
    }
  }
}
```

使用示例：
```ts
import { ActivitiesTabs } from "@components/activities/ActivitiesTabs";
import { activityTabs } from "@data/activitiesPageContent";
import { getAssetPath } from "@utils/path";
```

## 組件與資料的分層
- Page（`app/*/page.tsx`）：組裝頁面，用 Suspense/loading/metadata，負責路由專屬邏輯。
- UI Components（`components/*`）：關注視覺與互動狀態，避免耦合頁面專屬的業務邏輯或資料抓取。
- Data（`data/*`）：靜態內容、常數、型別，接受由 page 或 component 注入。
- Utils/Lib（`utils/*`, `lib/*`）：可重用邏輯。`utils` 為純函式；`lib` 可含環境耦合。

## 現況說明
- `ActivitiesTabs` 已改為使用別名匯入（`@data`, `@utils`, `@components`），降低相對路徑深度與後續搬移成本。
- `app/activities/page.tsx` 亦同步改為別名匯入。
- `getAssetPath` 暫為 pass-through，維持由 GitHub Pages 的 basePath 設定處理 public 路徑；若未來需要動態 CDN/basePath，應集中在此處理。

## 未來調整建議（Roadmap）
1. 建立 `lib/` 資料夾，逐步把具環境相依（e.g. `window`, `fetch`, SDK）的封裝與純函式 `utils/*` 分離。
2. 以 feature 為單位分模組（可在 `features/`），包含其下的 `components/`, `data/`, `hooks/`，進一步降低跨模組耦合。
3. 在 `components/*` 內建立 barrel（`index.ts`）簡化匯出，搭配別名取用（`@components/...`）。
4. Layout 與 SEO：在 `app/layout.tsx` 提取共用版型細節與 `metadata`，每頁僅覆寫必要資訊。

## 程式碼風格要點
- 型別明確、變數命名具語意。
- 優先使用早退（guard clauses），避免過深巢狀。
- 僅在必要處理例外時使用 try/catch，避免吞噬錯誤。
- 元件內僅保留與 UI 關聯的狀態；可抽出複雜狀態為自訂 hook。

---

若要新增頁面或模組，建議：
1) 在 `data/*` 放靜態資料與型別 → 2) 在 `components/*` 建立對應 UI → 3) 於 `app/*/page.tsx` 注入資料與組裝畫面 → 4) 需要環境相依封裝則置於 `lib/*`。 

