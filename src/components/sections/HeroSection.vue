<script setup lang="ts">
import { profile } from '@/data/profile'
import { localize } from '@/i18n'
import { IconArrowRight } from '@tabler/icons-vue'
import GlitchText from '@/components/effects/GlitchText.vue'
import NeonGrid from '@/components/effects/NeonGrid.vue'
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

/*
 * 地平線的位置跟著內容走，避免壓在文字上：
 * 文字是垂直置中的，螢幕比較矮或比較寬時，固定在 62% 的地平線會穿過介紹文字，
 * 加上遠處的格線很密，字就看不清楚
 * - 62% 在按鈕下方夠遠 → 維持 62%
 * - 否則 → 移到介紹文字和按鈕之間的空隙：文字在「天空」上，按鈕站在「地板」上
 */
const section = useTemplateRef('section')
const content = useTemplateRef('content')
const intro = useTemplateRef('intro')
const actions = useTemplateRef('actions')
const horizon = ref<number>()

/** 地平線和按鈕底部至少要隔多遠，才算「在按鈕下方夠遠」（px） */
const BELOW_ACTIONS = 32
/** 移到空隙時，離介紹文字底部多遠（px）；文字和按鈕之間是 mb-10（40px），取中間 */
const BELOW_INTRO = 20

function placeHorizon() {
  if (!section.value || !intro.value || !actions.value) return
  // offsetTop 是相對於 section（最近的 position: relative 祖先），不受進場動畫的 transform 影響
  const introBottom = intro.value.offsetTop + intro.value.offsetHeight
  const actionsBottom = actions.value.offsetTop + actions.value.offsetHeight
  const preferred = section.value.offsetHeight * 0.62
  horizon.value = preferred >= actionsBottom + BELOW_ACTIONS ? preferred : introBottom + BELOW_INTRO
}

// 視窗大小改變、字型載入完成造成文字換行改變時，都重新計算
let resizeObserver: ResizeObserver | undefined
onMounted(() => {
  resizeObserver = new ResizeObserver(placeHorizon)
  if (section.value) resizeObserver.observe(section.value)
  if (content.value) resizeObserver.observe(content.value)
})
onUnmounted(() => resizeObserver?.disconnect())
</script>

<template>
  <section
    id="top"
    ref="section"
    class="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-20"
  >
    <NeonGrid :horizon="horizon" />
    <!-- 底部漸層淡出，讓網格和下一個 section 自然銜接 -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-background"
      aria-hidden="true"
    />
    <div ref="content" class="w-full max-w-3xl text-center">
      <div
        v-reveal
        class="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pr-4 pl-3 text-sm text-white/70 backdrop-blur-md"
      >
        <span class="relative flex size-2.5">
          <span
            class="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"
          />
          <span class="relative size-2.5 rounded-full bg-emerald-400" />
        </span>
        {{ localize(profile.availability) }}
      </div>

      <h1
        v-reveal="100"
        class="mb-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
      >
        Hi, I'm<br />
        <GlitchText :text="profile.name" class="text-primary" />
      </h1>

      <p v-reveal="200" class="mb-4 text-xl text-white/85 sm:text-2xl">
        {{ localize(profile.tagline) }}
      </p>
      <p ref="intro" v-reveal="250" class="mx-auto mb-10 max-w-xl leading-relaxed text-white/55">
        {{ localize(profile.intro) }}
      </p>

      <div ref="actions" v-reveal="300" class="flex flex-wrap items-center justify-center gap-4">
        <a href="#contact" class="btn-secondary">{{ $t('hero.contact') }}</a>
        <a href="#projects" class="btn-primary group">
          {{ $t('hero.viewProjects') }}
          <IconArrowRight :size="18" class="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </section>
</template>
