import { Dispatch, SetStateAction } from 'react'

import { Category } from '@/types/categories'
import { Subscription } from '@/types/subscriptions'

export interface SubscriptionListItemProps {
  subscription: Subscription
  setSubscriptions: Dispatch<SetStateAction<Subscription[] | null>>
}

export interface SubscriptionListItemPresenterProps {
  subscription: Subscription
  category: Category | undefined
  navigateEditSubscriptionPage: () => void
  handleDeleteSubscription: () => void
}
