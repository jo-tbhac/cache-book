import { useMemo } from 'react'
import type { FC } from 'react'

import { ThemeContext } from '@/styles/hooks'
import { colors, styles } from '@/styles/theme'

import type { ThemeProviderProps } from './types'

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const theme = useMemo(() => ({ colors, styles }), [])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
