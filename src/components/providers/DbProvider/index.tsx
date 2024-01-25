import { FC, useMemo } from 'react'

import { DbContext, openDatabase, useCreateTable } from '@/db'

import { DbProviderProps } from './types'

export const DbProvider: FC<DbProviderProps> = ({ children }) => {
  const db = useMemo(() => openDatabase(), [])

  useCreateTable(db)

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>
}
