<script setup lang="ts">
/**
 * 站內履歷檢視視窗
 *
 * 為什麼不直接用 <iframe src="resume.pdf">：手機瀏覽器對內嵌 PDF 的支援很差，
 * iOS Safari 只顯示第一頁、Android Chrome 會直接跳出下載
 * 所以用 pdf.js 把每一頁畫在 <canvas> 上，各種裝置看起來都一樣
 *
 * pdf.js 很大（約 1MB），用動態 import，第一次打開履歷時才下載，不影響首頁載入速度
 *
 * 用原生 <dialog>.showModal()：瀏覽器會自動處理焦點限制在視窗內、按 Esc 關閉、背景不能操作
 */
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import { IconDownload, IconExternalLink, IconX } from '@tabler/icons-vue'
import { profile } from '@/data/profile'
import { useResumeViewer } from '@/composables/useResumeViewer'

const { isOpen, closeResume } = useResumeViewer()

const dialog = useTemplateRef('dialog')
const pagesEl = useTemplateRef('pages')

const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const pageCount = ref(0)

/** 下載時的檔名 */
const fileName = `${profile.name.replace(/\s+/g, '-')}-Resume.pdf`

async function render() {
  // 已經畫好了就不用重畫；失敗過的話再試一次
  if (status.value === 'ready' || status.value === 'loading') return
  status.value = 'loading'
  try {
    const [pdfjs, { default: workerUrl }] = await Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
    ])
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

    const pdf = await pdfjs.getDocument({ url: profile.resumeUrl }).promise
    pageCount.value = pdf.numPages
    await nextTick()

    const container = pagesEl.value
    if (!container) return
    // 依照容器寬度和螢幕像素密度決定解析度，高解析度螢幕上字才不會糊
    const cssWidth = container.clientWidth
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    const canvases = container.querySelectorAll('canvas')

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const base = page.getViewport({ scale: 1 })
      const viewport = page.getViewport({ scale: (cssWidth / base.width) * dpr })
      const canvas = canvases[i - 1]
      if (!canvas) continue
      canvas.width = Math.floor(viewport.width)
      canvas.height = Math.floor(viewport.height)
      await page.render({ canvas, viewport }).promise
    }
    status.value = 'ready'
  } catch (error) {
    console.error('履歷載入失敗', error)
    status.value = 'error'
  }
}

watch(isOpen, async (open) => {
  const el = dialog.value
  if (!el) return
  if (open) {
    el.showModal()
    // 視窗打開時背景不要跟著捲動
    document.documentElement.style.overflow = 'hidden'
    await nextTick()
    render()
  } else {
    if (el.open) el.close()
    document.documentElement.style.overflow = ''
  }
})

// 按 Esc 時是瀏覽器自己關掉 <dialog>，要同步回狀態
function onClose() {
  closeResume()
}

// 點視窗外面的半透明背景也關閉（點到的是 <dialog> 本身，而不是裡面的內容）
function onClick(e: MouseEvent) {
  if (e.target === dialog.value) closeResume()
}
</script>

<template>
  <dialog
    ref="dialog"
    class="resume-dialog m-auto h-[92svh] w-[min(56rem,calc(100vw-2rem))] max-w-none flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#141210] p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm open:flex"
    aria-labelledby="resume-title"
    @close="onClose"
    @click="onClick"
  >
    <header class="flex items-center gap-2 border-b border-white/10 px-4 py-3 sm:px-6">
      <h2 id="resume-title" class="mr-auto font-medium">履歷</h2>
      <a
        :href="profile.resumeUrl"
        :download="fileName"
        class="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-background transition hover:bg-secondary"
      >
        <IconDownload :size="16" />
        下載
      </a>
      <a
        :href="profile.resumeUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="在新分頁開啟 PDF"
        title="在新分頁開啟 PDF"
        class="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white"
      >
        <IconExternalLink :size="18" />
      </a>
      <button
        type="button"
        aria-label="關閉履歷"
        class="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white"
        @click="closeResume"
      >
        <IconX :size="18" />
      </button>
    </header>

    <div class="relative flex-1 overflow-y-auto overscroll-contain bg-black/40 p-3 sm:p-6">
      <p
        v-if="status === 'loading' && pageCount === 0"
        class="absolute inset-0 grid place-items-center font-mono text-xs tracking-[0.2em] text-white/55"
      >
        LOADING…
      </p>
      <div
        v-else-if="status === 'error'"
        class="grid h-full place-content-center gap-4 text-center text-sm text-white/70"
      >
        <p>履歷載入失敗</p>
        <a
          :href="profile.resumeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary underline"
        >
          直接開啟 PDF
        </a>
      </div>

      <div ref="pages" class="mx-auto flex max-w-3xl flex-col gap-3 sm:gap-6">
        <canvas
          v-for="n in pageCount"
          :key="n"
          role="img"
          :aria-label="`履歷第 ${n} 頁，共 ${pageCount} 頁`"
          class="h-auto w-full rounded-lg bg-white shadow-lg"
        />
      </div>
    </div>
  </dialog>
</template>
