/**
 * 取得正確的資源路徑（考慮 basePath）
 */
export function getAssetPath(path: string): string {
  // 使用環境變數，如果沒有則根據 NODE_ENV 判斷
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
