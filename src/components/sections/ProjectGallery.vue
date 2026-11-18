<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'

const props = withDefaults(
  defineProps<{
    images: readonly { src: string; alt: string }[]
    label: string
    /** 自動切換的間隔（毫秒），0 表示不自動切換 */
    interval?: number
  }>(),
  { interval: 5000 },
)

const reduceMotion = usePrefersReducedMotion()
const current = ref(0)

/*
 * 只能用箭頭和圓點切換，不支援手勢滑動：
 * 作品區本身是橫向捲動，輪播如果也能左右滑，兩個手勢會互相搶
 */
function goTo(index: number) {
  const n = props.images.length
  current.value = (index + n) % n
}

function select(index: number) {
  stopped.value = true
  goTo(index)
}

/*
 * 自動切換：
 * - 滑鼠移入或鍵盤聚焦時暫停，移開後繼續
 * - 使用者點過箭頭或圓點後就不再自動切換，避免和操作搶畫面
 * - 開啟「減少動態效果」時不自動切換
 */
const paused = ref(false)
const stopped = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (props.interval <= 0 || props.images.length < 2) return
  timer = setInterval(() => {
    if (!paused.value && !stopped.value && !reduceMotion.value) goTo(current.value + 1)
  }, props.interval)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div
    class="group/gallery absolute inset-0 overflow-hidden"
    role="region"
    aria-roledescription="carousel"
    :aria-label="label"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
  >
    <div
      class="flex size-full duration-500 ease-out motion-safe:transition-transform"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <img
        v-for="(img, i) in images"
        :key="img.src"
        :src="img.src"
        :alt="img.alt"
        :aria-hidden="current !== i"
        :loading="i === 0 ? 'eager' : 'lazy'"
        decoding="async"
        draggable="false"
        class="size-full shrink-0 object-contain"
      />
    </div>

    <template v-if="images.length > 1">
      <!-- 左右箭頭：滑鼠裝置在移入或鍵盤聚焦時出現；觸控裝置沒有 hover，一律顯示 -->
      <button
        v-for="dir in [-1, 1] as const"
        :key="dir"
        type="button"
        :aria-label="dir < 0 ? $t('projects.previous') : $t('projects.next')"
        class="absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-opacity hover:bg-black/80 pointer-fine:opacity-0 pointer-fine:group-hover/gallery:opacity-100 pointer-fine:focus-visible:opacity-100"
        :class="dir < 0 ? 'left-3' : 'right-3'"
        @click="select(current + dir)"
      >
        <IconChevronLeft v-if="dir < 0" :size="18" />
        <IconChevronRight v-else :size="18" />
      </button>

      <div class="absolute inset-x-0 bottom-2 flex justify-center">
        <button
          v-for="(img, i) in images"
          :key="img.src"
          type="button"
          :aria-label="$t('projects.slide', { n: i + 1 })"
          :aria-current="current === i"
          class="group/dot p-1.5"
          @click="select(i)"
        >
          <span
            class="block h-1.5 rounded-full transition-all"
            :class="
              current === i ? 'w-5 bg-primary' : 'w-1.5 bg-white/50 group-hover/dot:bg-white/80'
            "
          />
        </button>
      </div>
    </template>
  </div>
</template>
