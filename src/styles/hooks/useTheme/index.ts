import { createContext, useContext } from 'react'
import { colors, styles } from '../../theme'
import type { Theme } from '../../theme/types'

export const ThemeContext = createContext<Theme>({ colors, styles })
export const useTheme = (): Theme => useContext(ThemeContext)
