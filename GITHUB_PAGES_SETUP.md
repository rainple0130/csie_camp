# GitHub Pages 部署說明

## 配置步驟

### 1. 啟用 GitHub Pages

1. 前往 GitHub repository 的 Settings
2. 點擊左側的 "Pages"
3. 在 "Source" 選擇 "GitHub Actions"

### 2. 如果 Repository 名稱不是根路徑

如果你的 GitHub Pages URL 是 `https://username.github.io/repo-name/`（有 repo 名稱），需要修改 `next.config.ts`：

```typescript
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/repo-name", // 改成你的 repository 名稱
  assetPrefix: "/repo-name", // 改成你的 repository 名稱
};
```

如果你的 GitHub Pages URL 是 `https://username.github.io/`（沒有 repo 名稱），則不需要設定 `basePath`。

### 3. 推送代碼

將代碼推送到 `main` 分支，GitHub Actions 會自動：
1. 安裝依賴
2. 建置靜態網站
3. 部署到 GitHub Pages

### 4. 檢查部署狀態

- 前往 repository 的 "Actions" 標籤查看部署狀態
- 部署完成後，可以在 Settings > Pages 看到網站 URL

## 常見問題

### 圖片無法顯示

- 確保圖片放在 `public/` 目錄下
- 圖片路徑使用 `/image.png`（開頭有斜線）
- 如果設定了 `basePath`，圖片路徑會自動加上前綴

### 404 錯誤

- 確保所有頁面都是靜態生成的（不使用動態路由）
- 檢查 `next.config.ts` 中的 `output: "export"` 設定
- 如果設定了 `basePath`，確保所有連結都正確
