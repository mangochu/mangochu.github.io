import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { profile, projects } from '@/data/profile'
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

  it('可以正常掛載，並顯示個人資料與所有作品', () => {
    const wrapper = mount(App, {
      global: { directives: { reveal: vReveal, scramble: vScramble } },
    })

    expect(wrapper.text()).toContain(profile.tagline)
    for (const project of projects) {
      expect(wrapper.text()).toContain(project.title)
    }
  })
})
