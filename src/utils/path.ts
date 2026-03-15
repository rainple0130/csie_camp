import { BASE_PATH } from "../config/basePath";

/**
 * 取得正確的資源路徑（考慮 basePath）
 * Next.js 的 basePath 會自動處理 public 目錄下的資源
 * 但對於動態設定的路徑（如 style 中的 backgroundImage），需要手動加上 basePath
 */
export function getAssetPath(path: string): string {
  // 在客戶端，嘗試從 window.__NEXT_DATA__ 取得 basePath
  if (typeof window !== "undefined") {
    // Next.js 會將 basePath 存在 __NEXT_DATA__ 中
    const nextData = (window as any).__NEXT_DATA__;
    const clientBasePath = nextData?.assetPrefix || nextData?.basePath || "";
    
    if (clientBasePath) {
      return clientBasePath + path;
    }
    
    // 備用方案：從當前路徑判斷
    const pathname = window.location.pathname;
    if (pathname.startsWith("/csie_camp")) {
      return "/csie_camp" + path;
    }
    
    // 如果都沒有，使用建置時的 BASE_PATH（在生產環境會是 /csie_camp）
    return BASE_PATH + path;
  }
  
  // 在服務端建置時，直接使用 BASE_PATH
  return BASE_PATH + path;
}
