// 個人資料集中在這裡，修改這個檔案即可更新整個網站內容
import type { NavItem } from '@/types'
import avatarUrl from '@/assets/images/avatar.jpg'

export const profile = {
  name: 'Mango Chu',
  title: 'Frontend Engineer',
  availability: '正在尋找前端工程師職缺',
  tagline: '把複雜的規則，做成正確可靠的系統',
  intro:
    '物理碩士，近 3 年前端與 App 開發經驗。擅長 Vue、React 與 TypeScript，習慣先釐清規則、找出問題根因，再用可以驗證的方式確保結果正確。',
  avatar: avatarUrl,
  location: 'Taichung, Taiwan',
  email: 'mangochu81806@gmail.com',
  /** 履歷 PDF，放在 public/ 底下；導覽列的「履歷」會在站內視窗開啟 */
  resumeUrl: 'resume/resume.pdf',
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
    '現在我用同一套思考方式和 AI 協作開發個人作品：GoPio 台股記帳網站要求計算結果和券商對帳單逐筆一致。程式碼主要由 AI 產出，我負責查證手續費、證交稅、股利等規則，拿對帳單比對找出算錯的地方，並要求每條規則都要有測試把關。我希望加入軟體團隊，把想法做成真正能用的產品。',
  ],
  highlights: [
    '重視 UI 美感與互動細節，從排版、動畫到各種螢幕尺寸都反覆打磨',
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

/*
 * 作品卡片的預覽媒體，沒有填的話顯示作品名稱的佔位圖
 * 檔案放在 public/projects/ 底下，路徑以 / 開頭，例如 '/projects/tower.mp4'
 * - image：靜態截圖
 * - video：自動播放、靜音、循環的短片（建議 5–15 秒、MP4、3MB 以內）
 *   poster 是影片載入前的封面圖，使用者開啟「減少動態效果」時也只顯示這張
 * - gallery：多張截圖輪播，每 5 秒自動切換，可點箭頭或圓點切換（不支援手勢滑動）
 *   建議 3–5 張、比例一致（16:9），第一張放最有代表性的畫面
 * - site：網站預覽，src 填網址，'/' 代表這個作品集本身
 *   平常顯示部署時自動截的圖（scripts/capture-site-previews.ts，存到 /previews/），不用自己截圖
 *   滑鼠移到卡片上才載入 iframe 即時預覽，只能看、不能操作；觸控裝置只顯示截圖
 *   width（選填）：用多寬的桌機畫面呈現，預設 1440
 *   live（選填）：外部網站若設定了 X-Frame-Options 或 CSP frame-ancestors 禁止被嵌入，
 *   即時預覽會是空白或錯誤頁，設成 false 就只顯示截圖
 * - alt：描述畫面內容，給螢幕閱讀器使用
 */
export type ProjectMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string; alt: string }
  | { type: 'gallery'; images: { src: string; alt: string }[] }
  | { type: 'site'; src: string; alt: string; width?: number; live?: boolean }

export interface Project {
  title: string
  description: string
  tags: string[]
  /** 線上展示網址，空字串 '' 則不顯示按鈕 */
  demo: string
  /** 原始碼網址，不公開就填空字串 ''，不顯示按鈕 */
  repo: string
  featured: boolean
  media?: ProjectMedia
}

export const projects: Project[] = [
  {
    title: 'GoPio 台股記帳網站',
    description:
      '可離線、多裝置同步的台股記帳 PWA，計算結果與券商對帳單逐筆一致。手續費、證交稅、當沖、股利、二代健保等規則拆成前後端共用的純函式引擎，金額全面採用 decimal 運算，累積 600+ 個單元／整合測試與 Playwright E2E。以 AI 協作開發，由我負責規格、架構、規則查證與測試設計。',
    tags: ['React', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'Docker'],
    demo: 'https://gopio.win/',
    repo: '',
    featured: true,
    media: {
      type: 'gallery',
      images: [
        {
          src: '/projects/gopio/gopio-overview.webp',
          alt: 'GoPio 總覽頁，顯示總市值、未實現損益、股利收入與資產配置圓餅圖',
        },
        {
          src: '/projects/gopio/gopio-holdings.webp',
          alt: '持股頁，列出各檔股票的股數、平均成本、現價與報酬率',
        },
        {
          src: '/projects/gopio/gopio-transactions.webp',
          alt: '交易紀錄頁，每筆交易自動計算手續費、證交稅與淨收付',
        },
        {
          src: '/projects/gopio/gopio-dividends.webp',
          alt: '股利頁，顯示各公司股利佔比與每次發放的現金股利明細',
        },
        {
          src: '/projects/gopio/gopio-pnl.webp',
          alt: '損益頁，依年度與個股列出已實現損益',
        },
      ],
    },
  },
  {
    title: 'The 5-Floor Tower',
    description:
      '用 Unity／C# 獨立完成的 2D 橫向捲軸 RPG，實作有限狀態機、網格背包、收藏解鎖能力、技能樹節點編輯器與肉鴿詛咒選擇等系統。',
    tags: ['Unity', 'C#', 'FSM', 'Editor Tool'],
    demo: 'https://mangochu.itch.io/the5floortower',
    repo: '',
    featured: false,
    media: {
      type: 'video',
      src: '/projects/5-floor-tower/5-floor-tower.mp4',
      poster: '/projects/5-floor-tower/5-floor-tower-poster.jpg',
      alt: '主角在塔內與敵人戰鬥並施放技能',
    },
  },
  {
    title: '補償刀時間軸換算工具',
    description:
      '替《公主連結》戰隊戰玩家做的小工具：戰鬥時間被縮短時，把原本 90 秒的操作排程自動扣秒，並刪除來不及執行的步驟。截圖 OCR 用 PaddleOCR + ONNX Runtime Web 在瀏覽器內的 Web Worker 執行，不需要後端，支援繁中、簡中、日文與英文，並自動修正常見誤判。換算規則拆成純函式並寫單元測試，推送後由 GitHub Actions 測試並部署。以 AI 協作開發，由我負責需求定義、規則設計與驗證。',
    tags: ['Vue 3', 'TypeScript', 'ONNX Runtime Web', 'Web Worker', 'Vitest'],
    demo: 'https://mangochu.github.io/pcr-cb-timecalc/',
    repo: 'https://github.com/mangochu/pcr-cb-timecalc',
    featured: false,
    media: {
      type: 'site',
      src: 'https://mangochu.github.io/pcr-cb-timecalc/',
      alt: '補償刀時間軸換算工具的即時預覽，貼上時間軸並輸入補償秒數後顯示換算結果',
    },
  },
  {
    title: '個人作品集網站',
    description:
      '就是你正在看的這個網站。用 Vue 3、TypeScript 與 Tailwind CSS v4 打造液態玻璃搭配賽博龐克風格的介面，自製捲動進場與文字解碼指令、可篩選的套件牆和可滑動的作品輪播，並支援系統的「減少動態效果」設定。push 到 main 後由 GitHub Actions 自動執行型別檢查、lint、測試，通過才部署到 GitHub Pages。',
    tags: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'GitHub Actions'],
    // 訪客已經在網站上了，不放線上展示按鈕，只放原始碼
    demo: '',
    repo: 'https://github.com/mangochu/mangochu.github.io',
    featured: false,
    media: {
      type: 'site',
      src: '/',
      alt: '作品集網站首頁的即時預覽，賽博龐克風格的開場畫面與個人介紹',
    },
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
