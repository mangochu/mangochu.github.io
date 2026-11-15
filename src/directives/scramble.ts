import type { Directive } from 'vue'

/** 亂碼用的字元：片假名寬度和中文接近，替換時版面比較不會跳動 */
const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01#$%&*<>/'

/** 整段文字解碼完成的時間（毫秒） */
const DURATION = 900

const cleanups = new WeakMap<HTMLElement, () => void>()

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!
}

/**
 * 解碼文字效果：元素進入畫面時，文字先變成亂碼，再由左到右逐字解碼成原本的內容
 *
 * 只適合純文字的元素（會直接改 textContent），播完會還原成原本的文字
 */
export const vScramble: Directive<HTMLElement> = {
  mounted(el) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0

    function play() {
      const original = el.textContent ?? ''
      const chars = [...original]
      // 播放期間文字是亂碼，用 aria-label 讓螢幕閱讀器讀到正確內容
      el.setAttribute('aria-label', original)
      const start = performance.now()
      let lastSwap = 0

      function frame(now: number) {
        const progress = Math.min((now - start) / DURATION, 1)
        // 亂碼每 50ms 換一次就好，每幀都換會太花
        if (now - lastSwap > 50 || progress === 1) {
          lastSwap = now
          const resolved = Math.floor(progress * chars.length)
          el.textContent = chars
            .map((c, i) => (i < resolved || c.trim() === '' ? c : randomGlyph()))
            .join('')
        }
        if (progress < 1) {
          raf = requestAnimationFrame(frame)
        } else {
          el.textContent = original
          el.removeAttribute('aria-label')
        }
      }
      raf = requestAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          play()
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)

    cleanups.set(el, () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    })
  },

  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
}

declare module 'vue' {
  interface GlobalDirectives {
    vScramble: typeof vScramble
  }
}
