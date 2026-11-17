/**
 * 替作品卡片的網站預覽（media.type = 'site'）自動截圖
 *
 * 流程：用 Vite 啟動本機伺服器 → 打開網站，找出所有 [data-site-preview] 元素
 *      → 逐一用桌機尺寸打開該網址截圖 → 存成 previews/*.jpg
 *
 * 兩種模式：
 * - pnpm capture-previews：部署用（CI 會自動執行）。對 build 好的 dist 截圖，存到 dist/previews/
 *   要先 build：pnpm build-only && pnpm capture-previews
 * - pnpm capture-previews:dev：開發用。自己啟動一個 dev server 截圖，存到 public/previews/（不會被 commit）
 *   跑完後 pnpm dev 就看得到截圖；改了首頁想更新截圖時再跑一次
 *
 * 瀏覽器：優先用 Playwright 自己的 Chromium（CI 會安裝）；本機沒裝的話，自動改用電腦上的 Edge 或 Chrome
 * 想指定的話可以設環境變數 PLAYWRIGHT_CHANNEL（msedge／chrome）
 *
 * 某個網站截圖失敗只會印出警告、不會讓部署失敗，卡片會改顯示佔位圖
 */
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright'
import { createServer, preview } from 'vite'

const devMode = process.argv.includes('--dev')

// 截圖存放的根目錄：dev 模式放 public/（dev server 會直接提供），部署模式放 dist/（會被一起部署）
const OUT_DIR = devMode ? 'public' : 'dist'

async function startServer() {
  if (devMode) {
    // 不和使用者自己開著的 pnpm dev（預設 5173）搶 port
    const server = await createServer({ server: { port: 5199 }, logLevel: 'warn' })
    await server.listen()
    return { url: server.resolvedUrls!.local[0]!, close: () => server.close() }
  }
  // 不和使用者自己開著的 pnpm preview（預設 4173）搶 port；被佔用時 Vite 會自動往下找空的
  const server = await preview({ preview: { port: 4199 }, logLevel: 'warn' })
  return { url: server.resolvedUrls!.local[0]!, close: () => server.close() }
}

async function launchBrowser() {
  const preferred = process.env.PLAYWRIGHT_CHANNEL
  if (preferred) return chromium.launch({ channel: preferred })

  // 依序嘗試：Playwright 自己的 Chromium → 電腦上的 Edge → Chrome
  const errors: string[] = []
  for (const channel of [undefined, 'msedge', 'chrome']) {
    try {
      return await chromium.launch(channel ? { channel } : {})
    } catch (error) {
      const firstLine = (error as Error).message.split('\n')[0]
      errors.push(`${channel ?? 'playwright chromium'}：${firstLine}`)
    }
  }
  throw new Error(
    [
      '找不到可以用的瀏覽器，請執行 pnpm exec playwright install chromium，或安裝 Edge／Chrome',
      ...errors,
    ].join('\n'),
  )
}

// 先開瀏覽器再開伺服器：瀏覽器開不起來時直接結束，不會留下沒關掉的伺服器讓指令卡住
const browser = await launchBrowser()
const server = await startServer()
const base = server.url

let failed = 0

try {
  // 「減少動態效果」讓進場動畫、文字解碼特效直接顯示最終畫面，截圖不會截到動畫中途
  const context = await browser.newContext({ reducedMotion: 'reduce' })

  const home = await context.newPage()
  await home.goto(base, { waitUntil: 'networkidle' })
  const targets = await home.$$eval('[data-site-preview]', (els) =>
    els.map((el) => {
      const data = (el as HTMLElement).dataset
      return { src: data.sitePreview!, screenshot: data.screenshot!, width: Number(data.width) }
    }),
  )
  await home.close()

  // 同一個網址只截一次
  const unique = [...new Map(targets.map((t) => [t.screenshot, t])).values()]
  console.log(`找到 ${unique.length} 個網站預覽`)

  for (const target of unique) {
    const url = new URL(target.src, base).href
    const file = join(OUT_DIR, target.screenshot)
    try {
      const page = await context.newPage()
      // 和卡片一樣是 16:9
      await page.setViewportSize({
        width: target.width,
        height: Math.round((target.width * 9) / 16),
      })
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
      // dev 模式下 Vue DevTools 會在畫面底部放一個浮動按鈕，截圖時藏起來
      if (devMode) {
        await page.addStyleTag({
          content: '#__vue-devtools-container__ { display: none !important; }',
        })
      }
      // 等字型和圖片穩定下來
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(1000)
      await mkdir(dirname(file), { recursive: true })
      await page.screenshot({ path: file, type: 'jpeg', quality: 80 })
      await page.close()
      console.log(`✓ ${url} → ${file}`)
    } catch (error) {
      failed++
      console.warn(`⚠ ${url} 截圖失敗，卡片會顯示佔位圖：${(error as Error).message}`)
    }
  }
} finally {
  await browser.close()
  await server.close()
}

if (failed > 0) console.warn(`共 ${failed} 個網站截圖失敗`)
