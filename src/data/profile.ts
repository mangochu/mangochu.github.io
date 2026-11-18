// 個人資料集中在這裡，修改這個檔案即可更新整個網站內容
// 需要翻譯的欄位寫成 { 'zh-TW': '中文', en: 'English' }；各語言共用的（名字、網址、套件名稱）直接寫字串
// 按鈕、標題等介面文字在 src/i18n/locales/ 底下
import type { NavItem } from '@/types'
import type { Localized, MaybeLocalized } from '@/i18n'
import avatarUrl from '@/assets/images/avatar.jpg'

export const profile = {
  name: 'Mango Chu',
  title: 'Frontend Engineer',
  availability: {
    'zh-TW': '正在尋找前端工程師職缺',
    en: 'Open to frontend engineering roles',
  },
  tagline: {
    'zh-TW': '把複雜的規則，做成正確可靠的系統',
    en: 'Turning complex rules into correct, reliable systems',
  },
  intro: {
    'zh-TW':
      '物理碩士，近 3 年前端與 App 開發經驗。擅長 Vue、React 與 TypeScript，習慣先釐清規則、找出問題根因，再用可以驗證的方式確保結果正確。',
    en: 'Physics M.S. with nearly 3 years of frontend and app development experience, working mainly in Vue, React, and TypeScript. I pin down the rules first, trace problems to their root cause, and make sure the results are correct in ways that can be verified.',
  },
  avatar: avatarUrl,
  location: 'Taichung, Taiwan',
  email: 'mangochu81806@gmail.com',
  /** 履歷 PDF，放在 public/ 底下；導覽列的「履歷」會在站內視窗開啟 */
  resumeUrl: 'resume/resume.pdf',
  sourceUrl: 'https://github.com/mangochu/mangochu.github.io',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    twitter: 'https://x.com/',
  },
}

export const stats: { value: string; label: Localized }[] = [
  { value: '3', label: { 'zh-TW': '年前端與 App 經驗', en: 'years in frontend & apps' } },
  { value: '10+', label: { 'zh-TW': '款遊戲前端維護', en: 'game frontends maintained' } },
]

export const about: { paragraphs: Localized<string[]>; highlights: Localized<string[]> } = {
  paragraphs: {
    'zh-TW': [
      '我從面板廠的製程整合工程師轉到軟體開發。在友達的三年，我平均每天追蹤 2～3 件產線異常，養成「先蒐集證據、再提出假設、用實驗驗證」的除錯習慣。',
      '在聯訊網路擔任前端工程師時，我接手三大平台、十款以上遊戲的前端維護，半年內就能獨立處理九成以上的問題，之後也從零開發 Vue 3 與 React Native 新專案，並自架 CodePush Server 讓 App 不用重新送審就能熱更新。',
      '現在我用同一套思考方式和 AI 協作開發個人作品：GoPio 台股記帳網站要求計算結果和券商對帳單逐筆一致。程式碼主要由 AI 產出，我負責查證手續費、證交稅、股利等規則，拿對帳單比對找出算錯的地方，並要求每條規則都要有測試把關。我希望加入軟體團隊，把想法做成真正能用的產品。',
    ],
    en: [
      'I came to software from process integration engineering at a display panel maker. In three years at AUO, I tracked two to three production-line anomalies a day on average, and built a debugging habit: gather evidence first, form a hypothesis, then verify it with experiments.',
      'As a frontend engineer at Lianxun Network, I took over frontend maintenance for more than ten games across three major platforms, and within six months I was handling over 90% of issues on my own. I went on to build new Vue 3 and React Native projects from scratch, and self-hosted a CodePush server so the app could ship hot updates without another round of store review.',
      'Today I bring the same mindset to building personal projects with AI. GoPio, a Taiwan stock portfolio tracker, has to match brokerage statements line by line. AI writes most of the code; I research the rules for fees, securities transaction tax, dividends and more, compare results against real statements to find what’s miscalculated, and require every rule to be covered by tests. I’m looking to join a software team and turn ideas into products people actually use.',
    ],
  },
  highlights: {
    'zh-TW': [
      '重視 UI 美感與互動細節，從排版、動畫到各種螢幕尺寸都反覆打磨',
      '追到問題根因，修正事件監聽未卸載等長期存在的生命週期 Bug',
      '習慣和非技術背景的人釐清需求，協調跨部門合作',
    ],
    en: [
      'Care about UI aesthetics and interaction details, polishing layout, motion, and every screen size',
      'Chase bugs to the root cause, fixing long-standing lifecycle bugs such as event listeners that were never removed',
      'Comfortable clarifying requirements with non-technical people and coordinating across departments',
    ],
  },
}

export type SkillIcon = 'code' | 'palette' | 'server' | 'rocket'

export const skills: { icon: SkillIcon; title: Localized; description: Localized }[] = [
  {
    icon: 'code',
    title: { 'zh-TW': '前端開發', en: 'Frontend Development' },
    description: {
      'zh-TW': '用 Vue 與 React 開發與維護 Web 前端，處理狀態管理與資料流。',
      en: 'Build and maintain web frontends in Vue and React, including state management and data flow.',
    },
  },
  {
    icon: 'palette',
    title: { 'zh-TW': '切版與設計', en: 'Layout & Design' },
    description: {
      'zh-TW': '把設計稿切成可重用的元件，支援 RWD／PWA；也具備平面設計基礎。',
      en: 'Turn design mockups into reusable components with responsive and PWA support, backed by a foundation in graphic design.',
    },
  },
  {
    icon: 'server',
    title: { 'zh-TW': '後端與資料庫', en: 'Backend & Databases' },
    description: {
      'zh-TW': '用 Node.js 架設伺服器、設計與串接 RESTful API。',
      en: 'Build servers with Node.js, and design and integrate RESTful APIs.',
    },
  },
  {
    icon: 'rocket',
    title: { 'zh-TW': 'App 與部署', en: 'Apps & Deployment' },
    description: {
      'zh-TW': 'React Native App 開發與上架，Docker 部署到雲端 VPS。',
      en: 'Develop and publish React Native apps, and deploy to cloud VPS with Docker.',
    },
  },
]

// 套件牆的分類，順序即篩選按鈕的順序
export const techCategories = [
  { id: 'frontend', label: { 'zh-TW': '前端', en: 'Frontend' } },
  { id: 'design', label: { 'zh-TW': '切版與設計', en: 'Layout & Design' } },
  { id: 'backend', label: { 'zh-TW': '後端與資料庫', en: 'Backend & DB' } },
  { id: 'app', label: { 'zh-TW': 'App 與部署', en: 'Apps & Deploy' } },
  { id: 'game', label: { 'zh-TW': '遊戲開發', en: 'Game Dev' } },
  { id: 'other', label: { 'zh-TW': '其他', en: 'Other' } },
] as const satisfies readonly { id: string; label: Localized }[]

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
  | { type: 'image'; src: string; alt: Localized }
  | { type: 'video'; src: string; poster: string; alt: Localized }
  | { type: 'gallery'; images: { src: string; alt: Localized }[] }
  | { type: 'site'; src: string; alt: Localized; width?: number; live?: boolean }

export interface Project {
  /** 只用來當列表的 key，不會顯示 */
  id: string
  title: MaybeLocalized
  description: Localized
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
    id: 'gopio',
    title: { 'zh-TW': 'GoPio 台股記帳網站', en: 'GoPio Taiwan Stock Tracker' },
    description: {
      'zh-TW':
        '可離線、多裝置同步的台股記帳 PWA，計算結果與券商對帳單逐筆一致。手續費、證交稅、當沖、股利、二代健保等規則拆成前後端共用的純函式引擎，金額全面採用 decimal 運算，累積 600+ 個單元／整合測試與 Playwright E2E。以 AI 協作開發，由我負責規格、架構、規則查證與測試設計。',
      en: 'An offline-capable PWA for tracking Taiwan stock trades, synced across devices, with results that match brokerage statements line by line. Rules for brokerage fees, securities transaction tax, day trading, dividends, and the NHI supplementary premium live in a pure-function engine shared by frontend and backend, all money math is done in decimal, and it is backed by 600+ unit/integration tests plus Playwright E2E. Built with AI; I own the spec, architecture, rule research, and test design.',
    },
    tags: ['React', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'Docker'],
    demo: 'https://gopio.win/',
    repo: '',
    featured: true,
    media: {
      type: 'gallery',
      images: [
        {
          src: '/projects/gopio/gopio-overview.webp',
          alt: {
            'zh-TW': 'GoPio 總覽頁，顯示總市值、未實現損益、股利收入與資產配置圓餅圖',
            en: 'GoPio overview page showing total market value, unrealized P&L, dividend income, and an asset allocation pie chart',
          },
        },
        {
          src: '/projects/gopio/gopio-holdings.webp',
          alt: {
            'zh-TW': '持股頁，列出各檔股票的股數、平均成本、現價與報酬率',
            en: 'Holdings page listing shares, average cost, current price, and return for each stock',
          },
        },
        {
          src: '/projects/gopio/gopio-transactions.webp',
          alt: {
            'zh-TW': '交易紀錄頁，每筆交易自動計算手續費、證交稅與淨收付',
            en: 'Transactions page, where fees, transaction tax, and net amount are calculated for every trade',
          },
        },
        {
          src: '/projects/gopio/gopio-dividends.webp',
          alt: {
            'zh-TW': '股利頁，顯示各公司股利佔比與每次發放的現金股利明細',
            en: 'Dividends page showing each company’s share of dividend income and every cash dividend paid',
          },
        },
        {
          src: '/projects/gopio/gopio-pnl.webp',
          alt: {
            'zh-TW': '損益頁，依年度與個股列出已實現損益',
            en: 'P&L page listing realized gains and losses by year and by stock',
          },
        },
      ],
    },
  },
  {
    id: 'five-floor-tower',
    title: 'The 5-Floor Tower',
    description: {
      'zh-TW':
        '用 Unity／C# 獨立完成的 2D 橫向捲軸 RPG，實作有限狀態機、網格背包、收藏解鎖能力、技能樹節點編輯器與肉鴿詛咒選擇等系統。',
      en: 'A 2D side-scrolling RPG built solo in Unity/C#, with a finite state machine, grid inventory, abilities unlocked through collectibles, a skill-tree node editor, and roguelike curse selection.',
    },
    tags: ['Unity', 'C#', 'FSM', 'Editor Tool'],
    demo: 'https://mangochu.itch.io/the5floortower',
    repo: '',
    featured: false,
    media: {
      type: 'video',
      src: '/projects/5-floor-tower/5-floor-tower.mp4',
      poster: '/projects/5-floor-tower/5-floor-tower-poster.jpg',
      alt: {
        'zh-TW': '主角在塔內與敵人戰鬥並施放技能',
        en: 'The hero fighting enemies inside the tower and casting skills',
      },
    },
  },
  {
    id: 'pcr-cb-timecalc',
    title: { 'zh-TW': '補償刀時間軸換算工具', en: 'Clan Battle Carry-over Timeline Tool' },
    description: {
      'zh-TW':
        '替《公主連結》戰隊戰玩家做的小工具：戰鬥時間被縮短時，把原本 90 秒的操作排程自動扣秒，並刪除來不及執行的步驟。截圖 OCR 用 PaddleOCR + ONNX Runtime Web 在瀏覽器內的 Web Worker 執行，不需要後端，支援繁中、簡中、日文與英文，並自動修正常見誤判。換算規則拆成純函式並寫單元測試，推送後由 GitHub Actions 測試並部署。以 AI 協作開發，由我負責需求定義、規則設計與驗證。',
      en: 'A small tool for Princess Connect! Re:Dive Clan Battle players: when a carry-over attack shortens the battle time, it shifts the original 90-second action timeline and drops the steps there is no longer time for. Screenshot OCR runs entirely in the browser with PaddleOCR + ONNX Runtime Web in a Web Worker, with no backend, supports Traditional Chinese, Simplified Chinese, Japanese, and English, and auto-corrects common misreads. The conversion rules are unit-tested pure functions, and GitHub Actions tests and deploys on every push. Built with AI; I own the requirements, rule design, and validation.',
    },
    tags: ['Vue 3', 'TypeScript', 'ONNX Runtime Web', 'Web Worker', 'Vitest'],
    demo: 'https://mangochu.github.io/pcr-cb-timecalc/',
    repo: 'https://github.com/mangochu/pcr-cb-timecalc',
    featured: false,
    media: {
      type: 'site',
      src: 'https://mangochu.github.io/pcr-cb-timecalc/',
      alt: {
        'zh-TW': '補償刀時間軸換算工具的即時預覽，貼上時間軸並輸入補償秒數後顯示換算結果',
        en: 'Live preview of the timeline tool: paste a timeline, enter the carry-over seconds, and see the converted result',
      },
    },
  },
  {
    id: 'portfolio',
    title: { 'zh-TW': '個人作品集網站', en: 'Personal Portfolio' },
    description: {
      'zh-TW':
        '就是你正在看的這個網站。用 Vue 3、TypeScript 與 Tailwind CSS v4 打造液態玻璃搭配賽博龐克風格的介面，自製捲動進場與文字解碼指令、可篩選的套件牆和可滑動的作品輪播，並支援系統的「減少動態效果」設定與中英文切換。push 到 main 後由 GitHub Actions 自動執行型別檢查、lint、測試，通過才部署到 GitHub Pages。',
      en: 'The site you’re looking at. Built with Vue 3, TypeScript, and Tailwind CSS v4, it pairs liquid glass with a cyberpunk look, featuring custom scroll-reveal and text-decode directives, a filterable tech wall, and a swipeable project carousel. It respects the system “reduce motion” setting and switches between Chinese and English. Every push to main runs type checks, lint, and tests on GitHub Actions, and deploys to GitHub Pages only when they pass.',
    },
    tags: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'vue-i18n', 'GitHub Actions'],
    // 訪客已經在網站上了，不放線上展示按鈕，只放原始碼
    demo: '',
    repo: 'https://github.com/mangochu/mangochu.github.io',
    featured: false,
    media: {
      type: 'site',
      src: '/',
      alt: {
        'zh-TW': '作品集網站首頁的即時預覽，賽博龐克風格的開場畫面與個人介紹',
        en: 'Live preview of this portfolio’s home page, with its cyberpunk hero and introduction',
      },
    },
  },
]

export const experiences: {
  period: string
  role: MaybeLocalized
  company: MaybeLocalized
  description: Localized
  tags: MaybeLocalized<string[]>
}[] = [
  {
    period: '2024 — 2026',
    role: { 'zh-TW': '獨立遊戲開發者', en: 'Indie Game Developer' },
    company: 'Personal Project',
    description: {
      'zh-TW':
        '用 Unity／C# 獨立完成 2D RPG《The 5-Floor Tower》，從系統設計做到上線；用物件池改善效能，並開發技能樹節點編輯器。',
      en: 'Built the 2D RPG The 5-Floor Tower solo in Unity/C#, from system design to release; improved performance with object pooling and built a skill-tree node editor.',
    },
    tags: ['Unity', 'C#', 'FSM', 'Object Pool'],
  },
  {
    period: '2021 — 2024',
    role: 'Frontend Engineer',
    company: { 'zh-TW': '聯訊網路有限公司', en: 'Lianxun Network Co., Ltd.' },
    description: {
      'zh-TW':
        '維護三大平台、十款以上遊戲的前端（React、Vue 2/3、JSP），從零開發 Vue 3 與 React Native 新專案；自架 CodePush Server 實現免送審熱更新，排除 95% 以上的上架與審核問題。',
      en: 'Maintained frontends for 10+ games across three major platforms (React, Vue 2/3, JSP) and built new Vue 3 and React Native projects from scratch; self-hosted a CodePush server for hot updates without store review, eliminating over 95% of release and review issues.',
    },
    tags: ['Vue 2/3', 'React', 'React Native', 'TypeScript', 'CodePush', 'Egg.js'],
  },
  {
    period: '2016 — 2020',
    role: { 'zh-TW': '製程整合工程師', en: 'Process Integration Engineer' },
    company: { 'zh-TW': '友達光電', en: 'AUO Corporation' },
    description: {
      'zh-TW':
        '監控產線異常並分析根因，最高讓良率提升 30%；擔任部門 EDA 與智慧報表負責人，並協調跨部門、客戶與供應商處理異常。',
      en: 'Monitored production-line anomalies and analyzed root causes, improving yield by up to 30%; led the department’s EDA and smart reporting, and coordinated with other departments, customers, and suppliers to resolve issues.',
    },
    tags: {
      'zh-TW': ['根因分析', 'SPC', 'EDA', '資料報表'],
      en: ['Root Cause Analysis', 'SPC', 'EDA', 'Data Reporting'],
    },
  },
]

export const navItems: NavItem[] = [
  { id: 'about', label: { 'zh-TW': '關於我', en: 'About' } },
  { id: 'experience', label: { 'zh-TW': '經歷', en: 'Experience' } },
  { id: 'skills', label: { 'zh-TW': '技能', en: 'Skills' } },
  { id: 'projects', label: { 'zh-TW': '作品', en: 'Projects' } },
  { id: 'contact', label: { 'zh-TW': '聯絡', en: 'Contact' } },
]
