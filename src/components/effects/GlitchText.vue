<script setup lang="ts">
/**
 * 故障文字（glitch）
 *
 * 平常是普通文字，每隔幾秒短暫「故障」一次：
 * 疊在上面的青色、洋紅兩層複製文字會錯位閃現，並用 clip-path 只露出一條一條的橫切片，
 * 本體同時微微傾斜抖動，像訊號受到干擾。滑鼠移上去會連續故障。
 *
 * 複製的兩層用真正的元素加上 aria-hidden，而不是 ::before 的 content，
 * 螢幕閱讀器才不會把名字唸三次。
 */
defineProps<{ text: string }>()
</script>

<template>
  <span class="glitch">
    <span class="glitch-main">{{ text }}</span>
    <span class="glitch-layer glitch-cyan" aria-hidden="true">{{ text }}</span>
    <span class="glitch-layer glitch-magenta" aria-hidden="true">{{ text }}</span>
  </span>
</template>

<style scoped>
.glitch {
  /* 每隔多久故障一次；故障本身只佔最後約 10% 的時間 */
  --glitch-cycle: 4s;

  position: relative;
  display: inline-block;
}

.glitch-main {
  display: inline-block;
  animation: glitch-main var(--glitch-cycle) steps(1) infinite;
}

.glitch-layer {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: screen;
}

.glitch-cyan {
  color: #22d3ee; /* cyan-400 */
  animation: glitch-cyan var(--glitch-cycle) steps(1) infinite;
}

.glitch-magenta {
  color: #ec4899; /* pink-500 */
  animation: glitch-magenta var(--glitch-cycle) steps(1) infinite;
}

/* 滑鼠移上去時縮短週期，變成連續故障 */
@media (hover: hover) {
  .glitch:hover {
    --glitch-cycle: 0.5s;
  }
}

/* steps(1)：每個關鍵影格之間直接跳過去，不做補間，才有訊號斷裂的感覺 */
@keyframes glitch-main {
  0%,
  88%,
  100% {
    transform: none;
  }
  90% {
    transform: translateX(2px) skewX(-6deg);
  }
  93% {
    transform: translateX(-2px) skewX(4deg);
  }
  96% {
    transform: none;
  }
}

@keyframes glitch-cyan {
  0%,
  88%,
  98%,
  100% {
    opacity: 0;
    transform: none;
    clip-path: inset(0);
  }
  89% {
    opacity: 0.9;
    transform: translate(-4px, -1px);
    clip-path: inset(12% 0 58% 0);
  }
  91% {
    opacity: 0.9;
    transform: translate(3px, 1px);
    clip-path: inset(55% 0 18% 0);
  }
  94% {
    opacity: 0.9;
    transform: translate(-2px, 0);
    clip-path: inset(32% 0 44% 0);
  }
  96% {
    opacity: 0.9;
    transform: translate(4px, -1px);
    clip-path: inset(78% 0 4% 0);
  }
}

@keyframes glitch-magenta {
  0%,
  88%,
  98%,
  100% {
    opacity: 0;
    transform: none;
    clip-path: inset(0);
  }
  89% {
    opacity: 0.9;
    transform: translate(4px, 1px);
    clip-path: inset(62% 0 10% 0);
  }
  92% {
    opacity: 0.9;
    transform: translate(-3px, -1px);
    clip-path: inset(5% 0 70% 0);
  }
  95% {
    opacity: 0.9;
    transform: translate(2px, 1px);
    clip-path: inset(40% 0 35% 0);
  }
  97% {
    opacity: 0.9;
    transform: translate(-4px, 0);
    clip-path: inset(20% 0 62% 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glitch-main,
  .glitch-layer {
    animation: none;
  }
}
</style>
