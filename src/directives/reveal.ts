import type { Directive } from 'vue'

// 每個元素各自的 observer 與 animationend 監聽，供 unmounted 時清理
const cleanups = new WeakMap<HTMLElement, () => void>()

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.animationDelay = `${binding.value}ms`

    // 動畫播完後移除 class，避免 animation 的 transform 蓋掉 hover 等樣式
    const onAnimationEnd = (e: AnimationEvent) => {
      // 子元素的 animationend 會冒泡上來，只處理 el 自己的
      if (e.target !== el) return
      el.classList.remove('reveal', 'is-visible')
      el.style.animationDelay = ''
      el.removeEventListener('animationend', onAnimationEnd)
    }
    el.addEventListener('animationend', onAnimationEnd)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)

    cleanups.set(el, () => {
      observer.disconnect()
      el.removeEventListener('animationend', onAnimationEnd)
    })
  },

  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
}

// 讓全域註冊的 v-reveal 在 template 裡也有型別檢查
declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}
