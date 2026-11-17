<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useMediaQuery } from '@/composables/useMediaQuery'
import { isEmbedded } from '@/utils/isEmbedded'
import { sitePreviewPath } from '@/utils/sitePreview'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    /** 網站以多寬的桌機畫面呈現（px），再等比例縮小塞進卡片 */
    width?: number
    /** 滑鼠移到卡片上時是否載入即時預覽；網站禁止被嵌入時設成 false，只顯示截圖 */
    live?: boolean
  }>(),
  { width: 1440, live: true },
)

/*
 * 兩層顯示：
 * 1. 平常顯示部署時自動截的圖（不用載入整個網站，最省資源）
 * 2. 滑鼠移到卡片上才載入 iframe 即時預覽，載入完成後淡入蓋在截圖上
 *    移開時先藏起來（display: none，瀏覽器會暫停它的繪製與動畫），再移回來就立刻顯示、不用重新載入；
 *    閒置超過 KEEP_ALIVE_MS 才真正移除，釋放記憶體
 *
 * 作品集預覽自己時，iframe 裡的作品集又會再預覽自己，所以在預覽裡面（isEmbedded）一律只顯示截圖
 */
const screenshot = computed(() => sitePreviewPath(props.src))
const screenshotFailed = ref(false)

// 觸控裝置沒有「移到上面」的動作，只顯示截圖
const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
const canGoLive = computed(() => props.live && !isEmbedded && finePointer.value)

/** 滑鼠移開後保留即時預覽的時間，期間再移回來不用重新載入 */
const KEEP_ALIVE_MS = 600_000

/** 是否正在顯示即時預覽（滑鼠在卡片上） */
const active = ref(false)
/** iframe 是否存在（顯示中，或移開後還在保留期間） */
const loaded = ref(false)
/** iframe 裡的網站是否已經載入完成 */
const liveReady = ref(false)

let releaseTimer: ReturnType<typeof setTimeout> | undefined

function activate() {
  clearTimeout(releaseTimer)
  active.value = true
  loaded.value = true
}

function deactivate() {
  active.value = false
  clearTimeout(releaseTimer)
  releaseTimer = setTimeout(() => {
    loaded.value = false
    liveReady.value = false
  }, KEEP_ALIVE_MS)
}

// 焦點只是在同一張卡片裡移動（例如從 GitHub 按鈕移到另一個連結）時不關閉，避免預覽重新載入
function onFocusOut(e: FocusEvent) {
  if (card && e.relatedTarget instanceof Node && card.contains(e.relatedTarget)) return
  deactivate()
}

const root = useTemplateRef('root')
const box = ref({ width: 0, height: 0 })

// 依卡片的大小算出縮放比例，iframe 的高度也跟著換算，剛好填滿卡片
const scale = computed(() => box.value.width / props.width)
const frameHeight = computed(() => (scale.value > 0 ? box.value.height / scale.value : 0))

let resizeObserver: ResizeObserver | undefined
let card: HTMLElement | null = null

onMounted(() => {
  if (!root.value) return
  resizeObserver = new ResizeObserver(([entry]) => {
    if (entry) box.value = { width: entry.contentRect.width, height: entry.contentRect.height }
  })
  resizeObserver.observe(root.value)

  // 移到整張卡片上就觸發，不只是預覽區塊；鍵盤聚焦到卡片裡的連結也算
  card = root.value.closest('article') ?? root.value
  card.addEventListener('mouseenter', activate)
  card.addEventListener('mouseleave', deactivate)
  card.addEventListener('focusin', activate)
  card.addEventListener('focusout', onFocusOut)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  card?.removeEventListener('mouseenter', activate)
  card?.removeEventListener('mouseleave', deactivate)
  card?.removeEventListener('focusin', activate)
  card?.removeEventListener('focusout', onFocusOut)
  clearTimeout(releaseTimer)
})
</script>

<template>
  <!-- data-* 給部署時的截圖腳本讀取：要截哪個網址、存到哪裡、用多寬的畫面 -->
  <div
    ref="root"
    class="absolute inset-0 overflow-hidden bg-background"
    :data-site-preview="isEmbedded ? undefined : src"
    :data-screenshot="isEmbedded ? undefined : screenshot"
    :data-width="width"
  >
    <img
      v-if="!screenshotFailed"
      :src="screenshot"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="size-full object-cover object-top"
      @error="screenshotFailed = true"
    />
    <!-- 還沒有截圖（例如本機開發時沒跑過截圖腳本）就顯示佔位 -->
    <div
      v-else
      class="project-preview grid size-full place-items-center font-mono text-xs tracking-[0.2em] text-white/40"
    >
      {{ canGoLive ? 'HOVER FOR LIVE PREVIEW' : 'LIVE PREVIEW' }}
    </div>

    <!--
      inert：預覽只是畫面，不能點擊、不能用 Tab 移進去，也不會被螢幕閱讀器讀到裡面的內容
      sandbox：限制被嵌入的網站不能跳轉上層頁面或開彈出視窗
      scrolling="no"：外部網站的捲軸我們改不到 CSS，用這個屬性請瀏覽器不要顯示（自己的網站另外由 .is-embedded 隱藏）
    -->
    <iframe
      v-if="canGoLive && loaded"
      v-show="active"
      :src="src"
      :title="alt"
      inert
      sandbox="allow-scripts allow-same-origin"
      referrerpolicy="no-referrer"
      scrolling="no"
      class="pointer-events-none absolute top-0 left-0 origin-top-left border-0 transition-opacity duration-500"
      :class="liveReady && scale > 0 ? 'opacity-100' : 'opacity-0'"
      :style="{ width: `${width}px`, height: `${frameHeight}px`, transform: `scale(${scale})` }"
      @load="liveReady = true"
    />

    <span
      v-if="liveReady && active"
      class="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-white backdrop-blur"
      aria-hidden="true"
    >
      <span class="size-1.5 animate-pulse rounded-full bg-red-500" />
      LIVE
    </span>
  </div>
</template>
