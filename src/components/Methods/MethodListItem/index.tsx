import { FC } from 'react'

import { useDeleteMethod, useInsertMethod, useUpdateMethod } from '@/hooks/methods'
import { useMethods } from '@/store/methods'

import { MethodListItemPresenter } from './presenter'
import { MethodListItemProps } from './types'

export const MethodListItem: FC<MethodListItemProps> = ({ method }) => {
  const addMethodState = useMethods((state) => state.addMethod)
  const updateMethodState = useMethods((state) => state.updateMethod)
  const deleteMethodState = useMethods((state) => state.deleteMethod)

  const insertMethod = useInsertMethod()
  const updateMethod = useUpdateMethod()
  const deleteMethod = useDeleteMethod()

  const handleSaveMethod = (values: { name: string }) => {
    const newMethodName = values.name.trim()
    if (newMethodName === '') {
      return
    }

    if (method == null) {
      insertMethod({ name: newMethodName })
        .then((responseData) => {
          addMethodState(responseData)
        })
        .catch(() => {})

      return
    }

    updateMethod(method.id, { name: newMethodName })
      .then((responseData) => {
        updateMethodState(responseData)
      })
      .catch(() => {})
  }

  const handleDeleteMethod = () => {
    if (method == null) {
      return
    }

    deleteMethod(method.id)
      .then(() => {
        deleteMethodState(method.id)
      })
      .catch(() => {})
  }

  return (
    <MethodListItemPresenter
      method={method}
      handleSaveMethod={handleSaveMethod}
      handleDeleteMethod={handleDeleteMethod}
    />
  )
}
