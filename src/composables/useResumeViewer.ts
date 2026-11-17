import { ref } from 'vue'

/**
 * 履歷檢視視窗的開關，全站共用一份狀態
 * 導覽列的「履歷」按鈕呼叫 openResume()，App.vue 裡的 <ResumeViewer> 負責顯示
 */
const isOpen = ref(false)

export function useResumeViewer() {
  return {
    isOpen,
    openResume: () => (isOpen.value = true),
    closeResume: () => (isOpen.value = false),
  }
}
