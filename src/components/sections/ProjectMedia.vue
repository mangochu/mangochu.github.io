<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue'
import type { ProjectMedia } from '@/data/profile'
import { localize } from '@/i18n'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'
import ProjectGallery from './ProjectGallery.vue'
import ProjectSite from './ProjectSite.vue'

const props = defineProps<{ media: ProjectMedia; title: string }>()

const galleryImages = computed(() =>
  props.media.type === 'gallery'
    ? props.media.images.map((img) => ({ src: img.src, alt: localize(img.alt) }))
    : [],
)

// 使用者開啟「減少動態效果」時，影片只顯示封面圖、不自動播放
// 截圖（image、gallery）用 object-contain 完整顯示不裁切；影片和封面用 object-cover 填滿
const reduceMotion = usePrefersReducedMotion()

// Vue 的 muted 綁的是 property，不會出現在 HTML 屬性上；
// 部分瀏覽器（如 iOS Safari）要確定靜音才允許自動播放，所以影片出現時手動設定再播放
const video = useTemplateRef('video')

watch(video, (el) => {
  if (!el) return
  el.muted = true
  // 自動播放被瀏覽器擋下時就停在封面圖；舊瀏覽器的 play() 不會回傳 Promise
  el.play()?.catch(() => {})
})
</script>

<template>
  <ProjectGallery
    v-if="media.type === 'gallery'"
    :images="galleryImages"
    :label="$t('projects.screenshots', { title })"
  />
  <ProjectSite
    v-else-if="media.type === 'site'"
    :src="media.src"
    :alt="localize(media.alt)"
    :width="media.width"
    :live="media.live"
  />
  <img
    v-else-if="media.type === 'image' || reduceMotion"
    :src="media.type === 'image' ? media.src : media.poster"
    :alt="localize(media.alt)"
    loading="lazy"
    decoding="async"
    class="absolute inset-0 size-full"
    :class="media.type === 'image' ? 'object-contain' : 'object-cover'"
  />
  <video
    v-else
    ref="video"
    :src="media.src"
    :poster="media.poster"
    :aria-label="localize(media.alt)"
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
    class="absolute inset-0 size-full object-cover"
  />
</template>
