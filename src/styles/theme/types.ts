import { colors } from './colors'
import { styles } from './styles'

export interface AppColors {
  app: typeof colors.app
  font: typeof colors.font
  background: typeof colors.background
  border: typeof colors.border
  button: typeof colors.button
}

export interface AppStyles {
  borderRadius: typeof styles.borderRadius
  boxShadow: typeof styles.boxShadow
  fontSize: typeof styles.fontSize
  fontWeight: typeof styles.fontWeight
  opacity: typeof styles.opacity
  margin: typeof styles.margin
  padding: typeof styles.padding
}

export interface Theme {
  colors: AppColors
  styles: AppStyles
}
