// 個人資料集中在這裡，修改這個檔案即可更新整個網站內容
import type { NavItem } from '@/types'
import avatarUrl from '@/assets/images/avatar.jpg'

export const profile = {
  name: 'Mango Chu',
  title: 'Frontend / Full-stack Engineer',
  availability: '正在尋找前端／全端工程師職缺',
  tagline: '把複雜的規則，做成正確可靠的系統',
  intro:
    '物理碩士，近 3 年前端與 App 開發經驗。擅長 Vue、React 與 TypeScript，習慣先釐清規則、找出問題根因，再用可以驗證的方式確保結果正確。',
  avatar: avatarUrl,
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
  { value: '3', label: '年前端與 App 經驗' },
  { value: '10+', label: '款遊戲前端維護' },
]

export const about = {
  paragraphs: [
    '我從面板廠的製程整合工程師轉到軟體開發。在友達的三年，我平均每天追蹤 2～3 件產線異常，養成「先蒐集證據、再提出假設、用實驗驗證」的除錯習慣。',
    '在聯訊網路擔任前端工程師時，我接手三大平台、十款以上遊戲的前端維護，半年內就能獨立處理九成以上的問題，之後也從零開發 Vue 3 與 React Native 新專案，並自架 CodePush Server 讓 App 不用重新送審就能熱更新。',
    '現在我把同一套思考方式用在個人作品上：GoPio 台股記帳網站要求計算結果和券商對帳單逐筆一致，我把稅費規則拆成可測試的純函式，累積 600 多個測試。我希望加入軟體團隊，把想法做成真正能用的產品。',
  ],
  highlights: [
    '先寫測試再實作，用可驗證的方式確保結果正確',
    '追到問題根因，修正事件監聽未卸載等長期存在的生命週期 Bug',
    '習慣和非技術背景的人釐清需求，協調跨部門合作',
  ],
}

export type SkillIcon = 'code' | 'palette' | 'server' | 'rocket'

export const skills: { icon: SkillIcon; title: string; description: string }[] = [
  {
    icon: 'code',
    title: '前端開發',
    description: '用 Vue 與 React 開發與維護 Web 前端，處理狀態管理與資料流。',
  },
  {
    icon: 'palette',
    title: '切版與設計',
    description: '把設計稿切成可重用的元件，支援 RWD／PWA；也具備平面設計基礎。',
  },
  {
    icon: 'server',
    title: '後端與資料庫',
    description: '用 Node.js 架設伺服器、設計與串接 RESTful API。',
  },
  {
    icon: 'rocket',
    title: 'App 與部署',
    description: 'React Native App 開發與上架，Docker 部署到雲端 VPS。',
  },
]

// 套件牆的分類，順序即篩選按鈕的順序
export const techCategories = [
  { id: 'frontend', label: '前端' },
  { id: 'design', label: '切版與設計' },
  { id: 'backend', label: '後端與資料庫' },
  { id: 'app', label: 'App 與部署' },
  { id: 'game', label: '遊戲開發' },
  { id: 'other', label: '其他' },
] as const

export type TechCategory = (typeof techCategories)[number]['id']

/*
 * 套件牆：每個套件一張小卡，最多顯示 8 張
 * 排序：「全部」照這個陣列的順序顯示（想展示的放前面）；個別分類依熟練度由高到低
 * level：熟練度 0–100，請自行填寫；null 的不顯示進度條，排在最後
 * logo：對應 SkillWall 裡的品牌 logo，沒有的話顯示名稱縮寫
 */
export interface TechItem {
  name: string
  category: TechCategory
  level: number | null
  logo?: string
}

export const techStack: TechItem[] = [
  { name: 'Vue 2/3', category: 'frontend', level: 90, logo: 'vue' },
  { name: 'React', category: 'frontend', level: 75, logo: 'react' },
  { name: 'TypeScript', category: 'frontend', level: 90, logo: 'typescript' },
  { name: 'Tailwind CSS', category: 'design', level: 85, logo: 'tailwindcss' },
  { name: 'Pinia', category: 'frontend', level: 90, logo: 'pinia' },
  { name: 'MobX', category: 'frontend', level: 75, logo: 'mobx' },
  { name: 'Unity', category: 'game', level: 75, logo: 'unity' },
  { name: 'C#', category: 'game', level: 75, logo: 'csharp' },
  { name: 'Element Plus', category: 'design', level: 90, logo: 'element' },
  { name: 'Node.js', category: 'backend', level: 70, logo: 'nodejs' },
  { name: 'Fastify', category: 'backend', level: 75, logo: 'fastify' },
  { name: 'Egg.js', category: 'backend', level: 75 },
  { name: 'Prisma', category: 'backend', level: 75, logo: 'prisma' },
  { name: 'PostgreSQL', category: 'backend', level: 70, logo: 'postgresql' },
  { name: 'MySQL', category: 'backend', level: 70, logo: 'mysql' },
  { name: 'React Native', category: 'app', level: 75, logo: 'react-native' },
  { name: 'CodePush', category: 'app', level: 75, logo: 'codepush' },
  { name: 'Docker', category: 'app', level: 75, logo: 'docker' },
  { name: 'Python', category: 'other', level: 75, logo: 'python' },
  { name: 'Illustrator', category: 'design', level: 70, logo: 'illustrator' },
  { name: 'Photoshop', category: 'design', level: 70, logo: 'photoshop' },
]

export const projects = [
  {
    title: 'GoPio 台股記帳網站',
    description:
      '可離線、多裝置同步的台股記帳 PWA，計算結果與券商對帳單逐筆一致。手續費、證交稅、當沖、股利、二代健保等規則拆成前後端共用的純函式引擎，金額全面採用 decimal 運算，累積 600+ 個單元／整合測試與 Playwright E2E。以 AI 協作開發，由我負責規格、架構、規則查證與測試設計。',
    tags: ['React', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'Docker'],
    demo: '#',
    repo: '#',
    featured: true,
  },
  {
    title: 'The 5-Floor Tower',
    description:
      '用 Unity／C# 獨立完成的 2D 橫向捲軸 RPG，實作有限狀態機、網格背包、收藏解鎖能力、技能樹節點編輯器與肉鴿詛咒選擇等系統。',
    tags: ['Unity', 'C#', 'FSM', 'Editor Tool'],
    demo: '#',
    repo: '#',
    featured: false,
  },
  {
    title: 'AOI 缺陷影像辨識',
    description:
      '陽明交大「半導體與 AI 應用」專班的實作，用 Python 處理資料與視覺化，並以機器學習／深度學習模型辨識 AOI 缺陷影像。',
    tags: ['Python', 'NumPy', 'Matplotlib', 'Machine Learning'],
    demo: '#',
    repo: '#',
    featured: false,
  },
]

export const experiences = [
  {
    period: '2024 — 2026',
    role: '獨立遊戲開發者',
    company: 'Personal Project',
    description:
      '用 Unity／C# 獨立完成 2D RPG《The 5-Floor Tower》，從系統設計做到上線；用物件池改善效能，並開發技能樹節點編輯器。',
    tags: ['Unity', 'C#', 'FSM', 'Object Pool'],
  },
  {
    period: '2021 — 2024',
    role: 'Frontend Engineer',
    company: '聯訊網路有限公司',
    description:
      '維護三大平台、十款以上遊戲的前端（React、Vue 2/3、JSP），從零開發 Vue 3 與 React Native 新專案；自架 CodePush Server 實現免送審熱更新，排除 95% 以上的上架與審核問題。',
    tags: ['Vue 2/3', 'React', 'React Native', 'TypeScript', 'CodePush', 'Egg.js'],
  },
  {
    period: '2016 — 2020',
    role: '製程整合工程師',
    company: '友達光電',
    description:
      '監控產線異常並分析根因，最高讓良率提升 30%；擔任部門 EDA 與智慧報表負責人，並協調跨部門、客戶與供應商處理異常。',
    tags: ['根因分析', 'SPC', 'EDA', '資料報表'],
  },
]

export const navItems: NavItem[] = [
  { id: 'about', label: '關於我' },
  { id: 'experience', label: '經歷' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '作品' },
  { id: 'contact', label: '聯絡' },
]
