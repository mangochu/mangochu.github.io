import { useMediaQuery } from './useMediaQuery'

/** 使用者是否在系統開啟了「減少動態效果」 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
