import { Dispatch, SetStateAction } from 'react'

import { Subscription } from '@/types/subscriptions'

export interface SubscriptionListPresenterProps {
  subscriptions: Subscription[]
  setSubscriptions: Dispatch<SetStateAction<Subscription[] | null>>
}
