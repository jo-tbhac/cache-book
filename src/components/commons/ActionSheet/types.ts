import type { ReactNode } from 'react'

export interface ActionSheetProps {
  children: ReactNode
  show: boolean
  onBackDropPress?: () => void
  onClose?: () => void
}
