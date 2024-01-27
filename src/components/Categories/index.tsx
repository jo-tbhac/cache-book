import { FC } from 'react'

import { useCategories } from '@/store/categories'

import { CategoriesPresenter } from './presenter'

export const Categories: FC = () => {
  const categories = useCategories((state) => state.categories)

  return <CategoriesPresenter categories={categories} />
}
