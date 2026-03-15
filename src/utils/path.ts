/**
 * 取得正確的資源路徑（考慮 basePath）
 */
export function getAssetPath(path: string): string {
  // 在客戶端，從 window.location 判斷 basePath
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    // 如果路徑包含 /csie_camp，則使用 basePath
    if (pathname.startsWith("/csie_camp")) {
      return "/csie_camp" + path;
    }
    return path;
  }
  
  // 在服務端建置時，使用環境變數
  const basePath =
    (typeof process !== "undefined" &&
      process.env?.NEXT_PUBLIC_BASE_PATH) ||
    (typeof process !== "undefined" &&
      process.env?.NODE_ENV === "production"
      ? "/csie_camp"
      : "") ||
    "";
  return basePath + path;
}
