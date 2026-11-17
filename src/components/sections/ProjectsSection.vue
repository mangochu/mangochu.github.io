<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { projects } from '@/data/profile'
import { useMediaQuery } from '@/composables/useMediaQuery'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'
import ProjectCard from './ProjectCard.vue'
import SectionHeading from './SectionHeading.vue'

/*
 * 三種排版：
 * - pinned：桌機（滑鼠、夠寬夠高的視窗）— 區塊固定在畫面上，往下捲時卡片往左移動，像橫向捲軸遊戲
 * - swipe：觸控裝置 — 卡片排成一列，用手指左右滑，會吸附在每張卡片上
 * - stack：開啟「減少動態效果」，或滑鼠裝置但視窗太小 — 一般的兩欄排列
 */
const reduceMotion = usePrefersReducedMotion()
const roomyDesktop = useMediaQuery(
  '(min-width: 1024px) and (min-height: 600px) and (pointer: fine)',
)
const touch = useMediaQuery('(pointer: coarse)')

const mode = computed(() => {
  if (reduceMotion.value) return 'stack'
  if (roomyDesktop.value) return 'pinned'
  if (touch.value) return 'swipe'
  return 'stack'
})

const pin = useTemplateRef('pin')
const track = useTemplateRef('track')

/** 目前畫面上主要是第幾個作品，給 HUD 進度顯示用 */
const active = ref(0)
const stage = computed(() => String(active.value + 1).padStart(2, '0'))
const total = String(projects.length).padStart(2, '0')

/* ---------- pinned：把垂直捲動距離換算成卡片的水平位移 ---------- */

/** 卡片需要往左移動的總距離（px），也是區塊被固定住時要額外捲動的距離 */
const maxShift = ref(0)

function measure() {
  const el = track.value
  const last = el?.lastElementChild as HTMLElement | null | undefined
  if (mode.value !== 'pinned' || !el || !last) {
    maxShift.value = 0
    return
  }
  // 最後一張卡片的右緣要停在和第一張左緣對稱的位置
  const pad = parseFloat(getComputedStyle(el).paddingLeft)
  maxShift.value = Math.max(0, last.offsetLeft + last.offsetWidth + pad - el.clientWidth)
  updatePinned()
}

function updatePinned() {
  if (mode.value !== 'pinned' || !pin.value || !track.value) return
  const top = pin.value.getBoundingClientRect().top
  const progress = maxShift.value > 0 ? Math.min(Math.max(-top / maxShift.value, 0), 1) : 0
  // 直接改 style，不經過 Vue 的響應式，捲動時每一幀都要更新
  track.value.style.transform = `translate3d(${-progress * maxShift.value}px, 0, 0)`
  active.value = Math.round(progress * (projects.length - 1))
}

let frame = 0
function onWindowScroll() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    updatePinned()
  })
}

/*
 * 用 Tab 移到畫面外的卡片時，瀏覽器只會垂直捲動，不知道卡片是靠 transform 位移的
 * 所以自己算出該卡片對應的捲動位置，捲過去讓它出現在畫面上
 */
function onFocusIn(e: FocusEvent) {
  if (mode.value !== 'pinned' || !pin.value || !track.value) return
  const card = (e.target as HTMLElement).closest('li')
  if (!card) return
  const pad = parseFloat(getComputedStyle(track.value).paddingLeft)
  const shift = Math.min(Math.max(card.offsetLeft - pad, 0), maxShift.value)
  const pinTop = pin.value.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top: pinTop + shift, behavior: 'instant' })
}

/* ---------- swipe：依照水平捲動位置換算目前是第幾張 ---------- */

function onTrackScroll() {
  const el = track.value
  const [first, second] = (el?.children ?? []) as HTMLCollectionOf<HTMLElement>
  if (!el || !first) return
  const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth
  active.value = Math.min(Math.max(Math.round(el.scrollLeft / step), 0), projects.length - 1)
}

/* ---------- 尺寸改變或切換排版時重新計算 ---------- */

let resizeObserver: ResizeObserver | undefined

function observeTrack() {
  resizeObserver?.disconnect()
  if (track.value) resizeObserver?.observe(track.value)
  measure()
}

onMounted(() => {
  resizeObserver = new ResizeObserver(() => measure())
  window.addEventListener('scroll', onWindowScroll, { passive: true })
  window.addEventListener('resize', measure)
  observeTrack()
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('scroll', onWindowScroll)
  window.removeEventListener('resize', measure)
  cancelAnimationFrame(frame)
})

watch(mode, async () => {
  active.value = 0
  await nextTick()
  observeTrack()
})
</script>

<template>
  <section id="projects" class="py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        v-reveal
        section-id="projects"
        eyebrow="Projects"
        title="精選作品"
        description="近期參與與獨立完成的代表性專案。"
      />
    </div>

    <!-- pinned：外層的高度 = 一個畫面 + 卡片要移動的距離，內層 sticky 固定在畫面上 -->
    <div
      v-if="mode === 'pinned'"
      ref="pin"
      :style="{ height: `calc(100svh + ${maxShift}px)` }"
      @focusin="onFocusIn"
    >
      <!-- 用 overflow-clip 而不是 hidden：hidden 仍可被程式捲動，聚焦時瀏覽器會偷偷橫向捲它 -->
      <div
        class="sticky top-0 flex h-svh flex-col justify-center gap-8 overflow-clip pt-20 pb-8 [@media(max-height:760px)]:gap-4 [@media(max-height:760px)]:pb-4"
      >
        <div class="mx-auto w-full max-w-6xl px-8">
          <div class="project-hud">
            <span>STAGE {{ stage }} / {{ total }}</span>
            <span class="flex gap-1.5" aria-hidden="true">
              <span
                v-for="(p, i) in projects"
                :key="p.title"
                class="h-1 w-8 transition-colors"
                :class="i <= active ? 'bg-primary' : 'bg-white/15'"
              />
            </span>
            <span class="ml-auto text-white/35">SCROLL →</span>
          </div>
        </div>

        <ul
          ref="track"
          class="relative flex items-stretch gap-6 px-[max(2rem,calc((100%-72rem)/2+2rem))] will-change-transform"
        >
          <li
            v-for="(project, i) in projects"
            :key="project.title"
            v-reveal
            class="w-[min(42vw,clamp(18rem,calc((100svh-29rem)*1.7+3rem),34rem))] shrink-0"
          >
            <ProjectCard :project="project" :index="i" compact />
          </li>
        </ul>
      </div>
    </div>

    <!-- swipe：觸控裝置左右滑 -->
    <template v-else-if="mode === 'swipe'">
      <div class="mx-auto mb-4 max-w-6xl px-4 sm:px-6">
        <div class="project-hud">
          <span>STAGE {{ stage }} / {{ total }}</span>
          <span class="flex gap-1.5" aria-hidden="true">
            <span
              v-for="(p, i) in projects"
              :key="p.title"
              class="h-1 w-6 transition-colors"
              :class="i <= active ? 'bg-primary' : 'bg-white/15'"
            />
          </span>
          <span class="ml-auto text-white/35">SWIPE →</span>
        </div>
      </div>
      <!--
        v-reveal 放在整列上，不放在每張卡片：每張卡片只露出一小截（例如右邊預告的下一張），
        露出面積達不到 v-reveal 的門檻就會一直是透明的
      -->
      <ul
        ref="track"
        v-reveal
        class="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:scroll-px-6 sm:px-6"
        @scroll.passive="onTrackScroll"
      >
        <li
          v-for="(project, i) in projects"
          :key="project.title"
          class="w-[85%] max-w-md shrink-0 snap-start"
        >
          <ProjectCard :project="project" :index="i" />
        </li>
      </ul>
    </template>

    <!-- stack：一般的兩欄排列 -->
    <ul v-else class="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
      <li v-for="(project, i) in projects" :key="project.title" v-reveal="(i % 2) * 120">
        <ProjectCard :project="project" :index="i" />
      </li>
    </ul>
  </section>
</template>
