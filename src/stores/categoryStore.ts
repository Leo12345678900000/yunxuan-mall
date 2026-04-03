import { create } from 'zustand'
import type { CategoryHeadItem } from '@/types'
import { getCategoryHeadAPI } from '@/apis/layout'

interface CategoryState {
  categoryList: CategoryHeadItem[]
  getCategory: () => Promise<void>
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categoryList: [],
  getCategory: async () => {
    try {
      const res = (await getCategoryHeadAPI()) as { result: CategoryHeadItem[] }
      set({ categoryList: res.result ?? [] })
    } catch {
      /* 错误由 http 拦截器提示 */
    }
  },
}))
