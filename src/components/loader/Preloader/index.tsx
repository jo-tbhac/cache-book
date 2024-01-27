import { FC, useEffect } from 'react'

import { useGetCategories } from '@/hooks/categories'
import { useGetMethods } from '@/hooks/methods'
import { useCategories } from '@/store/categories'
import { useMethods } from '@/store/methods'

import { PreloaderProps } from './types'

export const Preloader: FC<PreloaderProps> = ({ children }) => {
  const fulfilledCategories = useCategories((state) => state.fulfilled)
  const fulfilledMethods = useMethods((state) => state.fulfilled)

  const setCategories = useCategories((state) => state.setCategories)
  const setMethods = useMethods((state) => state.setMethods)

  const getCategories = useGetCategories()
  const getMethods = useGetMethods()

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

  useEffect(() => {
    if (fulfilledMethods) {
      return
    }

    getMethods()
      .then((responseData) => {
        setMethods(responseData)
      })
      .catch(() => {})
  }, [fulfilledMethods, getMethods, setMethods])

  if (!fulfilledCategories || !fulfilledMethods) {
    return null
  }

  return children
}
