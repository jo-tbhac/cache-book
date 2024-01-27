import { Category } from '@/types/categories'

export interface CategoryListItemProps {
  category?: Category
}

export type CategoryListItemPresenterProps = CategoryListItemProps & {
  handleSaveCategory: (values: { name: string }) => void
  handleDeleteCategory: () => void
}
