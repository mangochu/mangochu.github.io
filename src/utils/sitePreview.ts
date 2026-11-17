/**
 * 網站預覽的截圖存放路徑，部署時由 scripts/capture-site-previews.ts 自動產生
 * '/'（作品集本身）→ /previews/self.jpg
 * 'https://gopio.win/' → /previews/gopio-win.jpg
 */
export function sitePreviewPath(src: string) {
  const slug = src
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
  return `/previews/${slug || 'self'}.jpg`
}
