<script setup lang="ts">
/**
 * 透視霓虹網格（synthwave／cyberpunk 地板）
 *
 * - 地板：一個平面以頂邊為軸 rotateX 倒下來，搭配父層的 perspective，
 *   頂邊停在地平線，越往下越靠近鏡頭、格子越大，形成透視
 * - 前進感：地板裡的網格持續往鏡頭方向位移一格，循環播放
 * - 地平線：一條發光的線，上方疊一層洋紅／紫色的霧
 * - 掃描線：整個區塊疊一層很淡的橫向細線，模擬 CRT 螢幕
 *
 * 純 CSS，動畫只改 transform，交給 GPU 合成
 */
</script>

<template>
  <div class="neon" aria-hidden="true">
    <div class="neon-haze" />
    <div class="neon-floor">
      <div class="neon-grid" />
    </div>
    <div class="neon-horizon" />
    <div class="neon-scanlines" />
  </div>
</template>

<style scoped>
.neon {
  /* 地平線的位置（從上往下），網格就從這裡開始 */
  --horizon: 62%;
  /* 每一格的大小 */
  --cell: 56px;
  /* 網格線的顏色（amber-400） */
  --line: rgb(251 191 36 / 0.5);

  position: absolute;
  inset: 0;
  z-index: -10;
  overflow: hidden;
  pointer-events: none;
  /* 視角距離越小，透視越誇張；消失點放在地平線上 */
  perspective: 300px;
  perspective-origin: 50% var(--horizon);
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

.neon-floor {
  position: absolute;
  top: var(--horizon);
  left: -50%;
  right: -50%;
  /* 高度要小於 perspective / sin(角度)，否則地板會穿過鏡頭後方 */
  height: 300px;
  overflow: hidden;
  transform-origin: top;
  transform: rotateX(80deg);
  /* 靠近地平線的地方淡出，遠處的細線才不會擠成一團鋸齒 */
  mask-image: linear-gradient(to bottom, transparent, #000 35%);
}

.neon-grid {
  position: absolute;
  /* 往上多一格，往下位移一格時才不會露出空白 */
  inset: calc(var(--cell) * -1) 0 0;
  background-image:
    linear-gradient(to right, var(--line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--line) 1px, transparent 1px);
  background-size: var(--cell) var(--cell);
  background-position: center top;
  will-change: transform;
  animation: neon-forward 1.2s linear infinite;
}

/* 往鏡頭方向剛好移動一格，接回起點時看不出接縫 */
@keyframes neon-forward {
  to {
    transform: translateY(var(--cell));
  }
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
  background: repeating-linear-gradient(
    to bottom,
    transparent 0 2px,
    rgb(0 0 0 / 0.18) 2px 3px
  );
}

@media (prefers-reduced-motion: reduce) {
  .neon-grid {
    animation: none;
  }
}
</style>
