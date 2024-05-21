import type { ReactNode } from 'react'

export interface FloatButtonProps {
  onPress: () => void
  onLongPress?: () => void
  children: ReactNode
  position?: { top?: number; bottom?: number; left?: number; right?: number }
}
