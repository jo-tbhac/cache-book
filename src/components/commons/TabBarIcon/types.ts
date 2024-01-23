import FontAwesome from '@expo/vector-icons/FontAwesome6'

export type TabBarIconProps = Pick<typeof FontAwesome, 'name'> & {
  color: string
}
