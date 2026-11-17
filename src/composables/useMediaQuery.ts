import { onMounted, onUnmounted, ref } from 'vue'

/**
 * CSS media query 目前是否成立，條件改變時（例如調整視窗大小、切換系統設定）會即時更新
 * 不支援 matchMedia 的環境（例如測試用的 jsdom）一律視為 false
 */
export function useMediaQuery(query: string) {
  const mql = typeof window.matchMedia === 'function' ? window.matchMedia(query) : undefined
  const matches = ref(mql?.matches ?? false)

  function onChange(e: MediaQueryListEvent) {
    matches.value = e.matches
  }

  onMounted(() => mql?.addEventListener('change', onChange))
  onUnmounted(() => mql?.removeEventListener('change', onChange))

  return matches
}
