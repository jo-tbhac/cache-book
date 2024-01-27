import { FC } from 'react'

import { useMethods } from '@/store/methods'

import { MethodsPresenter } from './presenter'

export const Methods: FC = () => {
  const methods = useMethods((state) => state.methods)

  return <MethodsPresenter methods={methods} />
}
