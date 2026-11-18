<script setup lang="ts">
/**
 * 電腦版導覽列的語言下拉選單（手機版的語言選項在 NavBar 的漢堡選單裡）
 *
 * 用「按鈕 + 展開清單」的 disclosure 模式，而不是 role="menu"：
 * 只有兩個選項，Tab 就能依序移動，不需要實作方向鍵導覽
 */
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { IconCheck, IconChevronDown, IconWorld } from '@tabler/icons-vue'
import { currentLocale, localeNames, locales, setLocale, type Locale } from '@/i18n'

const isOpen = ref(false)
const root = useTemplateRef('root')
const trigger = useTemplateRef('trigger')

function close({ restoreFocus = false } = {}) {
  isOpen.value = false
  if (restoreFocus) trigger.value?.focus()
}

function select(locale: Locale) {
  setLocale(locale)
  close({ restoreFocus: true })
}

// 點選單外面、或焦點移出選單（例如 Tab 到下一個連結）時關閉
function onPointerDown(e: PointerEvent) {
  if (isOpen.value && !root.value?.contains(e.target as Node)) close()
}

function onFocusOut(e: FocusEvent) {
  if (!root.value?.contains(e.relatedTarget as Node | null)) close()
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onUnmounted(() => document.removeEventListener('pointerdown', onPointerDown))
</script>

<template>
  <div
    ref="root"
    class="relative"
    @focusout="onFocusOut"
    @keydown.esc="close({ restoreFocus: true })"
  >
    <button
      ref="trigger"
      type="button"
      class="flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 pr-2.5 pl-3 text-sm text-white/70 transition-colors hover:text-white"
      :class="{ 'text-white': isOpen }"
      :aria-label="`${$t('nav.language')}: ${localeNames[currentLocale()]}`"
      :aria-expanded="isOpen"
      aria-controls="language-menu"
      @click="isOpen = !isOpen"
    >
      <IconWorld :size="16" />
      <span>{{ currentLocale() === 'en' ? 'EN' : '中文' }}</span>
      <IconChevronDown
        :size="14"
        class="transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <ul
        v-if="isOpen"
        id="language-menu"
        class="glass absolute top-full right-0 mt-3 min-w-40 rounded-2xl! p-1.5"
      >
        <li v-for="locale in locales" :key="locale">
          <button
            type="button"
            :lang="locale"
            :aria-current="locale === currentLocale()"
            class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5"
            :class="locale === currentLocale() ? 'text-white' : 'text-white/60 hover:text-white'"
            @click="select(locale)"
          >
            <IconCheck
              :size="16"
              class="shrink-0 text-primary"
              :class="{ invisible: locale !== currentLocale() }"
            />
            {{ localeNames[locale] }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
