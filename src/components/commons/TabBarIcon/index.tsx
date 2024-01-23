import FontAwesome from '@expo/vector-icons/FontAwesome6'
import type { FC } from 'react'
import type { TabBarIconProps } from './types'

export const TabBarIcon: FC<TabBarIconProps> = ({ name, color }) => {
  return <FontAwesome name={name} size={20} color={color} />
}
