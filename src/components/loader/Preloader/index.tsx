import { FC, useEffect } from 'react'

import { useGetCategories } from '@/hooks/categories'
import { useCategories } from '@/store/categories'

import { PreloaderProps } from './types'

export const Preloader: FC<PreloaderProps> = ({ children }) => {
  const fulfilledCategories = useCategories((state) => state.fulfilled)
  const setCategories = useCategories((state) => state.setCategories)

  const getCategories = useGetCategories()

  useEffect(() => {
    if (fulfilledCategories) {
      return
    }

    getCategories()
      .then((responseData) => {
        setCategories(responseData)
      })
      .catch(() => {})
  }, [fulfilledCategories, getCategories, setCategories])

  if (!fulfilledCategories) {
    return null
  }

  return children
}
