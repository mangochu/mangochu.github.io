<script setup lang="ts">
/**
 * 賽博龐克整頁背景
 *
 * - 網格：整頁固定一層很淡的格線，延續 Hero 霓虹地板的科技感；四周淡出，中間不會太滿
 * - 掃描光束：一道很淡的橫向光帶，每隔一段時間從上往下掃過畫面
 *
 * 純 CSS，固定在最底層，捲動時不跟著移動
 */
</script>

<template>
  <div class="cyber" aria-hidden="true">
    <div class="cyber-grid" />
    <div class="cyber-beam" />
  </div>
</template>

<style scoped>
.cyber {
  position: fixed;
  inset: 0;
  z-index: -20;
  overflow: hidden;
  pointer-events: none;
}

.cyber-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgb(255 255 255 / 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.045) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: center;
  /* 中間清楚、四周淡出，不會像一張方格紙 */
  mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 85%);
}

.cyber-beam {
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 30vh;
  background: linear-gradient(
    to bottom,
    transparent,
    rgb(251 191 36 / 0.035) 70%,
    rgb(251 191 36 / 0.08) 98%,
    transparent
  );
  translate: 0 -30vh;
  will-change: translate;
  /* 掃過去只花 40% 的時間，剩下時間停在畫面外，才不會一直有東西在動 */
  animation: cyber-scan 10s ease-in-out infinite;
}

@keyframes cyber-scan {
  0% {
    translate: 0 -30vh;
  }
  40%,
  100% {
    translate: 0 100vh;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cyber-beam {
    display: none;
  }
}
</style>
