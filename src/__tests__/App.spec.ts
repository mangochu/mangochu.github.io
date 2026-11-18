import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { profile, projects } from '@/data/profile'
import { i18n, localize, locales, setLocale } from '@/i18n'
import { vReveal } from '@/directives/reveal'
import { vScramble } from '@/directives/scramble'

// jsdom 沒有實作 IntersectionObserver、ResizeObserver 和 matchMedia，給什麼都不做的替身
// matchMedia 回傳「開啟減少動態效果」，讓文字特效直接顯示最終文字
class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', ObserverStub)
    vi.stubGlobal('ResizeObserver', ObserverStub)
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener() {},
      removeEventListener() {},
    }))
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function mountApp() {
    return mount(App, {
      global: { plugins: [i18n], directives: { reveal: vReveal, scramble: vScramble } },
    })
  }

  it.each(locales)('%s：可以正常掛載，並顯示個人資料與所有作品', (locale) => {
    setLocale(locale)
    const wrapper = mountApp()

    expect(wrapper.text()).toContain(profile.tagline[locale])
    for (const project of projects) {
      expect(wrapper.text()).toContain(localize(project.title))
    }
  })

  it('點導覽列的語言按鈕會切換語言，並同步 <html lang>', async () => {
    setLocale('zh-TW')
    const wrapper = mountApp()

    await wrapper.get('nav button[lang="en"]').trigger('click')

    expect(wrapper.text()).toContain(profile.tagline.en)
    expect(wrapper.text()).not.toContain(profile.tagline['zh-TW'])
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('locale')).toBe('en')
  })
})
