import { BASE_PATH } from "@/config/basePath";

/**
 * 取得正確的資源路徑（考慮 basePath）
 * Next.js 的 basePath 會自動處理 public 目錄下的資源
 * 但對於動態設定的路徑（如 style 中的 backgroundImage），需要手動加上 basePath
 */
export function getAssetPath(path: string): string {
  // 交給 GitHub Actions 的 configure-pages (static_site_generator: next) 自動注入 basePath
  // 在程式中一律使用從 public 起算的絕對路徑即可
  return BASE_PATH + path;
}
