<script setup lang="ts">
import { navItems, profile } from '@/data/profile'
import { IconLanguage, IconMenu2, IconX } from '@tabler/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useResumeViewer } from '@/composables/useResumeViewer'
import { currentLocale, localeNames, locales, localize, setLocale } from '@/i18n'
import LanguageMenu from './LanguageMenu.vue'

const profileName = profile.name.split(' ')[0]
const isMenuOpen = ref(false)
const activeId = ref('')
const { openResume } = useResumeViewer()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenu = () => {
  isMenuOpen.value = false
}

/*
 * 履歷按鈕：一般點擊改成在站內視窗開啟
 * 仍然保留 href 指向 PDF，按住 Ctrl／Cmd 點擊或用中鍵時，照瀏覽器原本的行為在新分頁開啟
 */
function onResumeClick(e: MouseEvent) {
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  closeMenu()
  openResume()
}

let observer: IntersectionObserver | undefined

onMounted(() => {
  const visible = new Set<string>()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id)
        else visible.delete(entry.target.id)
      })
      const current = navItems.find((item) => visible.has(item.id))
      activeId.value = current?.id ?? ''
    },
    { rootMargin: '-40% 0px -50% 0px' },
  )

  navItems.forEach((item) => {
    const section = document.getElementById(item.id)
    if (section) {
      observer?.observe(section)
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <header class="fixed inset-x-0 top-4 z-50 px-4">
    <nav
      class="glass mx-auto relative flex h-14 max-w-4xl items-center justify-end md:justify-between pr-2 pl-6"
    >
      <a href="#top" class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        ><span class="text-2xl">{{ profileName }}<span class="text-primary">.</span></span>
      </a>
      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="rounded-full px-4 py-2 text-sm transition-colors"
            :class="activeId === item.id ? 'bg-white/10' : 'text-white/60 hover:text-white'"
          >
            {{ localize(item.label) }}
          </a>
        </li>
      </ul>
      <div class="flex items-center gap-2">
        <!-- 電腦版：下拉選單；手機版的語言選項收在漢堡選單裡 -->
        <LanguageMenu class="hidden md:block" />
        <a
          :href="profile.resumeUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-haspopup="dialog"
          class="btn-primary hidden px-5! py-2! text-sm md:inline-flex"
          @click="onResumeClick"
        >
          {{ $t('nav.resume') }}
        </a>
        <button
          class="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
          :aria-label="isMenuOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <IconX v-if="isMenuOpen" :size="20" />
          <IconMenu2 v-else :size="20" />
        </button>
      </div>
    </nav>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="glass mx-auto mt-2 max-w-4xl p-3 md:hidden">
        <a
          v-for="item in navItems"
          :href="`#${item.id}`"
          :key="item.id"
          class="block w-full rounded-2xl px-4 py-3 text-left transition-colors hover:bg-white/5"
          @click="closeMenu"
        >
          {{ localize(item.label) }}
        </a>
        <a
          :href="profile.resumeUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-haspopup="dialog"
          class="btn-primary mt-2 w-full"
          @click="onResumeClick"
          >{{ $t('nav.viewResume') }}</a
        >
        <!-- 語言切換：選了之後選單不關閉，讓使用者直接看到選單文字換成新語言 -->
        <div
          class="mt-3 flex items-center justify-between gap-3 border-t border-white/10 px-4 pt-3"
          role="group"
          :aria-label="$t('nav.language')"
        >
          <!-- 文A 圖示：看不懂目前語言的人也認得出這是語言設定 -->
          <span class="flex items-center gap-2 text-sm text-white/55">
            <IconLanguage :size="18" aria-hidden="true" />
            {{ $t('nav.language') }}
          </span>
          <div class="flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              v-for="locale in locales"
              :key="locale"
              type="button"
              :lang="locale"
              :aria-pressed="locale === currentLocale()"
              class="rounded-full px-3.5 py-1.5 text-sm transition-colors"
              :class="
                locale === currentLocale()
                  ? 'bg-primary text-background'
                  : 'text-white/60 hover:text-white'
              "
              @click="setLocale(locale)"
            >
              {{ localeNames[locale] }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped></style>
