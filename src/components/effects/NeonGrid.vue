<script setup lang="ts">
/**
 * 透視霓虹網格（synthwave／cyberpunk 地板）
 *
 * - 地板：從地平線往鏡頭延伸的格子，越往下越靠近鏡頭、格子越大，形成透視
 * - 前進感：橫線持續往鏡頭方向移動，循環播放
 * - 地平線：一條發光的線，上方疊一層洋紅／紫色的霧
 * - 掃描線：整個區塊疊一層很淡的橫向細線，模擬 CRT 螢幕
 *
 * 為什麼不用 CSS 的 3D transform（rotateX + perspective）把一張格子平面倒下來：
 * iOS Safari 渲染這種「幾乎平躺、又延伸到鏡頭前」的 3D 平面時會一直閃（某幾格整片消失，或被壓成一條橫線）。
 * 所以改成自己算好透視後的位置，全部用 2D 畫：
 * - 直線：透視後是從地平線往外放射的直線，越往下越粗 → 用 SVG 多邊形畫，不會動
 * - 橫線：深度 d 的橫線在畫面上的位置和粗細可以直接算出來 → 預先算好關鍵影格，用 Web Animations API 播放
 *   動畫只改 transform，瀏覽器會交給 GPU 合成，不佔主執行緒
 */
import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'

/** 每一格的大小（px，地板上的尺寸） */
const CELL = 56
/** 鏡頭到地平線的距離（px），越小透視越誇張 */
const PERSPECTIVE = 300
/** 地板傾斜的角度：90° 是完全平躺 */
const TILT = (80 * Math.PI) / 180
/** 往前移動一格的時間（ms） */
const CELL_DURATION = 1200
/** 同時存在的橫線數量；每條從地平線一路移動到 LINES 格深的地方，再回到地平線 */
const LINES = 5

const cos = Math.cos(TILT)
const sin = Math.sin(TILT)

/**
 * 地板上深度 d（從地平線往鏡頭量）的橫線，在畫面上離地平線多遠（y）、1px 的線看起來有多粗（thickness）
 * w 是透視造成的放大倍率：越靠近鏡頭越大
 */
function project(d: number) {
  const w = 1 / (1 - (d * sin) / PERSPECTIVE)
  return { y: d * cos * w, thickness: cos * w * w }
}

function lineTransform(d: number) {
  const { y, thickness } = project(d)
  return `translateY(${y.toFixed(2)}px) scaleY(${thickness.toFixed(3)})`
}

/*
 * 直線：地板上 x = x0 的直線，畫面上在 y 處的水平位置是 x0 × (1 + y × tan / PERSPECTIVE)
 * 所以是從地平線上的 x0 出發、往外放射的直線；線寬也照同樣的倍率變粗，畫成梯形
 * 以畫面中央為 0；格子置中，所以直線在 -CELL/2 + k × CELL
 */
const SPREAD = Math.tan(TILT) / PERSPECTIVE
/** 多邊形往下畫多長（px），只要超過地板可能的高度就好 */
const FAR = 2000
const farScale = 1 + FAR * SPREAD
const verticals = Array.from({ length: 49 }, (_, i) => {
  const x0 = -CELL / 2 + (i - 24) * CELL
  const x1 = x0 + 1
  return `${x0},0 ${x1},0 ${(x1 * farScale).toFixed(1)},${FAR} ${(x0 * farScale).toFixed(1)},${FAR}`
})

/*
 * 橫線的關鍵影格：深度 0 → LINES 格，每 2px 一格；越靠近鏡頭移動越快，所以要切細一點，中間的直線內插才不會失真
 * 走到最深處時 y 已經約 600px，在地板下方被裁掉或被 Hero 底部的漸層蓋住，跳回地平線時看不出來
 */
const TRAVEL = LINES * CELL
const keyframes: Keyframe[] = []
for (let d = 0; d <= TRAVEL; d += 2) {
  keyframes.push({ offset: d / TRAVEL, transform: lineTransform(d) })
}

/** 每條橫線靜止時（或「減少動態效果」時）的位置：彼此相隔一格 */
const staticTransforms = Array.from({ length: LINES }, (_, i) => lineTransform(i * CELL))

const floor = useTemplateRef('floor')
const reduceMotion = usePrefersReducedMotion()
let animations: Animation[] = []

function stop() {
  animations.forEach((a) => a.cancel())
  animations = []
}

function start() {
  stop()
  if (reduceMotion.value || !floor.value) return
  const lines = floor.value.querySelectorAll<HTMLElement>('.neon-line')
  animations = [...lines].map((line, i) =>
    line.animate(keyframes, {
      duration: (TRAVEL / CELL) * CELL_DURATION,
      iterations: Infinity,
      easing: 'linear',
      // 每條錯開一格，接起來就是連續、等距前進的橫線
      delay: -i * CELL_DURATION,
    }),
  )
}

onMounted(start)
watch(reduceMotion, start)
onUnmounted(stop)
</script>

<template>
  <div class="neon" aria-hidden="true">
    <div class="neon-haze" />
    <div ref="floor" class="neon-floor">
      <svg class="neon-verticals" width="1" height="1">
        <polygon v-for="(points, i) in verticals" :key="i" :points="points" />
      </svg>
      <div
        v-for="(transform, i) in staticTransforms"
        :key="i"
        class="neon-line"
        :style="{ transform }"
      />
    </div>
    <div class="neon-horizon" />
    <div class="neon-scanlines" />
  </div>
</template>

<style scoped>
.neon {
  /* 地平線的位置（從上往下），網格就從這裡開始 */
  --horizon: 62%;
  /* 網格線的顏色（amber-400） */
  --line: rgb(251 191 36 / 0.5);

  position: absolute;
  inset: 0;
  z-index: -10;
  overflow: hidden;
  pointer-events: none;
}

/* 地平線上方的霓虹霧氣 */
.neon-haze {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 45% at 50% var(--horizon),
    rgb(236 72 153 / 0.22),
    rgb(124 58 237 / 0.12) 45%,
    transparent 75%
  );
}

/* 地板：從地平線到區塊底部 */
.neon-floor {
  position: absolute;
  top: var(--horizon);
  inset-inline: 0;
  bottom: 0;
  overflow: hidden;
  /* 靠近地平線的地方淡出，遠處的細線才不會擠成一團鋸齒 */
  mask-image: linear-gradient(to bottom, transparent, #000 28px);
}

/* 直線：SVG 的原點放在地平線正中央，多邊形往兩側、往下畫出去 */
.neon-verticals {
  position: absolute;
  top: 0;
  left: 50%;
  overflow: visible;
  fill: var(--line);
}

/* 橫線：1px 高，用 transform 移到對應的深度並放粗 */
.neon-line {
  position: absolute;
  top: 0;
  inset-inline: 0;
  height: 1px;
  background: var(--line);
  transform-origin: top;
  will-change: transform;
}

.neon-horizon {
  position: absolute;
  top: var(--horizon);
  left: 0;
  right: 0;
  height: 1px;
  background: rgb(251 191 36 / 0.9);
  box-shadow:
    0 0 12px 2px rgb(251 191 36 / 0.6),
    0 0 40px 8px rgb(236 72 153 / 0.35);
  /* 兩側淡出 */
  mask-image: linear-gradient(to right, transparent, #000 20%, #000 80%, transparent);
}

.neon-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(to bottom, transparent 0 2px, rgb(0 0 0 / 0.18) 2px 3px);
}
</style>
