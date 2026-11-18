import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zhTW from './locales/zh-TW'

/*
 * 多語系分兩種：
 * - 介面文字（按鈕、標題、aria-label）放在 locales/ 底下，用 vue-i18n 的 t() / $t() 取用
 * - 網站內容（自我介紹、作品、經歷）放在 data/profile.ts，需要翻譯的欄位寫成 { 'zh-TW': ..., en: ... }，
 *   用 localize() 取出目前語言的版本；同一筆資料的兩種語言放在一起，比較好對照修改
 */

export const locales = ['zh-TW', 'en'] as const
export type Locale = (typeof locales)[number]

/** 語言選單裡顯示的名稱，用該語言自己的寫法，不隨目前語言翻譯 */
export const localeNames: Record<Locale, string> = { 'zh-TW': '繁體中文', en: 'English' }

/** 需要翻譯的內容：每種語言各一份 */
export type Localized<T = string> = Record<Locale, T>
/** 可以是各語言共用的值（例如套件名稱），也可以是各語言各一份 */
export type MaybeLocalized<T = string> = T | Localized<T>

const STORAGE_KEY = 'locale'

/** <html lang> 用的語言標籤 */
const htmlLang: Record<Locale, string> = { 'zh-TW': 'zh-Hant-TW', en: 'en' }

function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale)
}

function readStoredLocale() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/*
 * 決定一開始用哪個語言，優先順序：
 * 1. 網址的 ?lang=en（方便直接把英文版連結給別人）
 * 2. 上次手動切換的語言
 * 3. 瀏覽器語言：中文（zh-*）用繁中，其他一律英文
 */
function detectLocale(): Locale {
  const fromQuery = new URLSearchParams(window.location.search).get('lang')
  if (isLocale(fromQuery)) return fromQuery

  const stored = readStoredLocale()
  if (isLocale(stored)) return stored

  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  return preferred.some((lang) => lang?.toLowerCase().startsWith('zh')) ? 'zh-TW' : 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'zh-TW',
  messages: { 'zh-TW': zhTW, en },
})

export function currentLocale(): Locale {
  return i18n.global.locale.value as Locale
}

/** 同步 <html lang>、分頁標題和 meta description（搜尋引擎抓的是 index.html 裡的繁中版本） */
function applyToDocument(locale: Locale) {
  document.documentElement.lang = htmlLang[locale]
  document.title = i18n.global.t('meta.title')
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.global.t('meta.description'))
}

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // 無痕模式等情況存不了，就只在這次瀏覽有效
  }
  applyToDocument(locale)
}

applyToDocument(currentLocale())

function isLocalized<T>(value: MaybeLocalized<T>): value is Localized<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    locales.every((locale) => locale in value)
  )
}

/**
 * 取出目前語言的內容；共用的值原樣回傳
 * 在 template 裡呼叫時會追蹤語言的變化，切換語言後自動重新渲染
 */
export function localize<T>(value: MaybeLocalized<T>): T {
  return isLocalized(value) ? value[currentLocale()] : value
}
