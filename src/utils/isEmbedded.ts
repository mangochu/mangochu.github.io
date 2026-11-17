/**
 * 這個頁面是不是被別的頁面用 iframe 嵌入（例如作品卡片的網站即時預覽）
 * 被嵌入時 window.self 和 window.top 會不同；跨網域時讀 window.top 可能被擋，被擋就代表一定在 iframe 裡
 */
export const isEmbedded = (() => {
  try {
    return window.self !== window.top
  } catch {
    return true
  }
})()
