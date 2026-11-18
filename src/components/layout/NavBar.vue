<script setup lang="ts">
import { navItems, profile } from '@/data/profile'
import { IconMenu2, IconX } from '@tabler/icons-vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useResumeViewer } from '@/composables/useResumeViewer'
import { currentLocale, localize, setLocale } from '@/i18n'

/** 切換按鈕顯示「要切換過去」的語言，用該語言自己的寫法 */
const nextLocale = computed(() => (currentLocale() === 'en' ? 'zh-TW' : 'en'))
const nextLocaleLabel = computed(() => (nextLocale.value === 'en' ? 'EN' : '中'))

function toggleLocale() {
  setLocale(nextLocale.value)
}

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
        <button
          type="button"
          class="grid h-10 min-w-10 place-items-center rounded-full border border-white/10 bg-white/5 px-3 font-mono text-xs tracking-wider text-white/70 transition-colors hover:text-white"
          :lang="nextLocale"
          :aria-label="$t('nav.switchLanguage')"
          :title="$t('nav.switchLanguage')"
          @click="toggleLocale"
        >
          {{ nextLocaleLabel }}
        </button>
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
      </div>
    </Transition>
  </header>
</template>

<style scoped></style>
