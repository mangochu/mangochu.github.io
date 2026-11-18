// 介面文字（繁體中文）；網站內容在 data/profile.ts
// 注意：vue-i18n 的訊息裡 { } @ | 有特殊意義，要顯示這些字元得寫成 {'@'} 這種形式
export default {
  meta: {
    title: 'Mango Chu｜前端工程師作品集',
    description:
      'Mango Chu 的個人作品集。物理碩士、近 3 年前端與 App 開發經驗，擅長 Vue、React 與 TypeScript，把複雜的規則做成正確可靠的系統。',
  },
  nav: {
    resume: '履歷',
    viewResume: '查看履歷',
    openMenu: '開啟選單',
    closeMenu: '關閉選單',
    language: '語言',
  },
  footer: {
    source: '網站原始碼',
    backToTop: '回到頂端',
  },
  resume: {
    title: '履歷',
    download: '下載',
    openInNewTab: '在新分頁開啟 PDF',
    close: '關閉履歷',
    loadFailed: '履歷載入失敗',
    openDirectly: '直接開啟 PDF',
    page: '履歷第 {n} 頁，共 {total} 頁',
  },
  hero: {
    contact: '與我聯絡',
    viewProjects: '查看作品',
  },
  about: {
    title: '關於我',
    highlights: '我在乎的事',
  },
  experience: {
    title: '工作經歷',
    description: '由近到遠，一路走來的軌跡。',
  },
  skills: {
    title: '專業技能',
    description: '我用來把想法變成產品的工具與能力。',
    tools: '工具與套件',
    all: '全部',
    filter: '依分類篩選',
    proficiency: '{name} 熟練度',
    showing: '顯示 {shown} / {total} 項',
    showAll: '，選擇分類查看全部',
  },
  projects: {
    title: '精選作品',
    description: '近期參與與獨立完成的代表性專案。',
    featured: '精選專案',
    source: '原始碼（另開新視窗）',
    demo: '線上展示（另開新視窗）',
    screenshots: '{title} 截圖',
    previous: '上一張',
    next: '下一張',
    slide: '第 {n} 張',
    openLive: '開啟網站即時預覽',
    closeLive: '關閉網站即時預覽',
  },
  contact: {
    title: '有個想法？一起聊聊。',
    description: '有任何專案想法或合作機會，歡迎與我聯絡。',
    name: '姓名',
    namePlaceholder: '你的名字',
    message: '訊息',
    messagePlaceholder: '想聊些什麼？',
    submit: '送出訊息',
    mailSubject: '來自 {name} 的訊息',
  },
}
