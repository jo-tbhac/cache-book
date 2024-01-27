import { Category } from '@/types/categories'

export interface CategoriesState {
  categories: Category[]
  fulfilled: boolean
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  updateCategory: (category: Category) => void
  deleteCategory: (categoryId: number) => void
}
