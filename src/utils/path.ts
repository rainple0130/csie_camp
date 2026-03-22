import { BASE_PATH } from "../config/basePath";

/**
 * 取得正確的資源路徑（考慮 basePath）
 * Next.js 的 basePath 會自動處理 public 目錄下的資源
 * 但對於動態設定的路徑（如 style 中的 backgroundImage），需要手動加上 basePath
 */
export function getAssetPath(path: string): string {
  // 靜態輸出時直接使用建置期 basePath，避免客戶端判斷造成路徑飄移
  return BASE_PATH + path;
}
