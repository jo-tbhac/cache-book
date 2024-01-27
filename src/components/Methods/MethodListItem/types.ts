import { Method } from '@/types/methods'

export interface MethodListItemProps {
  method?: Method
}

export type MethodListItemPresenterProps = MethodListItemProps & {
  handleSaveMethod: (values: { name: string }) => void
  handleDeleteMethod: () => void
}
