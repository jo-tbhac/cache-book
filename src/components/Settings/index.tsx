import { router } from 'expo-router'
import { FC } from 'react'

import { SettingsPresenter } from './presenter'

export const Settings: FC = () => {
  const navigateCategoriesPage = () => {
    router.push('categories')
  }

  const navigateMethodsPage = () => {
    router.push('methods')
  }

  return (
    <SettingsPresenter
      navigateCategoriesPage={navigateCategoriesPage}
      navigateMethodsPage={navigateMethodsPage}
    />
  )
}
