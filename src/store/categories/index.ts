import { create } from 'zustand'

import { Category } from '@/types/categories'

import { CategoriesState } from './types'

export const useCategories = create<CategoriesState>((set) => ({
  fulfilled: false,
  categories: [],
  setCategories: (categories: Category[]) => set({ categories, fulfilled: true }),
  addCategory: (newCategory: Category) =>
    set((state) => ({ categories: [...state.categories, newCategory] })),
  updateCategory: (newCategory: Category) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === newCategory.id ? { ...category, ...newCategory } : category
      )
    })),
  deleteCategory: (categoryId: number) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== categoryId)
    }))
}))
