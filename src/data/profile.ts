// 個人資料集中在這裡，修改這個檔案即可更新整個網站內容
import type { NavItem } from '@/types'

export const profile = {
  name: 'Mango Chu',
  title: 'Frontend Engineer',
  tagline: '打造流暢、優雅且好用的網頁體驗',
  intro:
    '我是一名專注於前端開發與介面設計的工程師，熱愛把複雜的需求轉化為簡潔直覺的產品。擅長 Vue、TypeScript 與設計系統的建構。',
  location: 'Taichung, Taiwan',
  email: 'mangochu81806@gmail.com',
  resumeUrl: '#',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    twitter: 'https://x.com/',
  },
}

export const stats = [
  { value: '4+', label: '年開發經驗' },
  { value: '30+', label: '參與專案' },
  { value: '100%', label: '熱情投入' },
]

export const about = {
  paragraphs: [
    '從大學時期第一次寫出會動的網頁開始，我就深深著迷於「讓想法在瀏覽器上活起來」這件事。',
    '目前專注於大型前端架構、元件庫與效能優化，也喜歡和設計師密切合作，把每個細節打磨到位。',
  ],
  highlights: [
    '重視使用者體驗與可存取性',
    '習慣撰寫可維護、可測試的程式碼',
    '熱衷分享，持續撰寫技術文章',
  ],
}

export type SkillIcon = 'code' | 'palette' | 'server' | 'rocket'

export const skills: { icon: SkillIcon; title: string; description: string; tags: string[] }[] = [
  {
    icon: 'code',
    title: '前端開發',
    description: '以現代框架建構高效能、可維護的網頁應用。',
    tags: ['Vue 3', 'TypeScript', 'Vite', 'Pinia'],
  },
  {
    icon: 'palette',
    title: 'UI / UX 設計',
    description: '從使用者出發，設計直覺且一致的介面。',
    tags: ['Figma', 'Design System', 'Tailwind CSS'],
  },
  {
    icon: 'server',
    title: '後端與 API',
    description: '串接與設計 RESTful / GraphQL 服務。',
    tags: ['Node.js', 'GraphQL', 'PostgreSQL'],
  },
  {
    icon: 'rocket',
    title: '效能與部署',
    description: 'CI/CD 自動化、Core Web Vitals 優化。',
    tags: ['GitHub Actions', 'Docker', 'Vercel'],
  },
]

export const projects = [
  {
    title: 'Glass Dashboard',
    description: '以 Liquid Glass 風格打造的資料分析儀表板，支援即時圖表與暗色主題。',
    tags: ['Vue 3', 'ECharts', 'Tailwind'],
    demo: '#',
    repo: '#',
    featured: true,
  },
  {
    title: 'Design Tokens Kit',
    description: '跨框架的設計 token 與元件庫，讓設計與開發保持同步。',
    tags: ['TypeScript', 'Storybook'],
    demo: '#',
    repo: '#',
    featured: false,
  },
  {
    title: 'Realtime Chat',
    description: '支援多房間、已讀狀態與檔案傳送的即時聊天應用。',
    tags: ['Nuxt', 'WebSocket', 'Redis'],
    demo: '#',
    repo: '#',
    featured: false,
  },
]

export const experiences = [
  {
    period: '2023 — 現在',
    role: 'Senior Frontend Engineer',
    company: 'Awesome Tech Co.',
    description: '主導前端架構重構，建立共用元件庫，頁面載入速度提升 40%。',
  },
  {
    period: '2021 — 2023',
    role: 'Frontend Engineer',
    company: 'Creative Studio',
    description: '負責多個品牌官網與電商專案，與設計團隊合作導入設計系統。',
  },
  {
    period: '2019 — 2021',
    role: 'Junior Web Developer',
    company: 'Startup Inc.',
    description: '開發內部管理系統與行銷活動頁，累積全端開發經驗。',
  },
]

export const navItems: NavItem[] = [
  { id: 'about', label: '關於我' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '作品' },
  { id: 'experience', label: '經歷' },
  { id: 'contact', label: '聯絡' },
]
