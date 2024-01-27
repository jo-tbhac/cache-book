import { FC } from 'react'

import { useDeleteCategory, useInsertCategory, useUpdateCategory } from '@/hooks/categories'
import { useCategories } from '@/store/categories'

import { CategoryListItemPresenter } from './presenter'
import { CategoryListItemProps } from './types'

export const CategoryListItem: FC<CategoryListItemProps> = ({ category }) => {
  const addCategoryState = useCategories((state) => state.addCategory)
  const updateCategoryState = useCategories((state) => state.updateCategory)
  const deleteCategoryState = useCategories((state) => state.deleteCategory)

  const insertCategory = useInsertCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const handleSaveCategory = (values: { name: string }) => {
    const newCategoryName = values.name.trim()
    if (newCategoryName === '') {
      return
    }

    if (category == null) {
      insertCategory({ name: newCategoryName })
        .then((responseData) => {
          addCategoryState(responseData)
        })
        .catch(() => {})

      return
    }

    updateCategory(category.id, { name: newCategoryName })
      .then((responseData) => {
        updateCategoryState(responseData)
      })
      .catch(() => {})
  }

  const handleDeleteCategory = () => {
    if (category == null) {
      return
    }

    deleteCategory(category.id)
      .then(() => {
        deleteCategoryState(category.id)
      })
      .catch(() => {})
  }

  return (
    <CategoryListItemPresenter
      category={category}
      handleSaveCategory={handleSaveCategory}
      handleDeleteCategory={handleDeleteCategory}
    />
  )
}
