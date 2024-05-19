import { Dispatch, SetStateAction } from 'react'

import { Category } from '@/types/categories'
import { Method } from '@/types/methods'
import { Subscription } from '@/types/subscriptions'

export interface FormProps {
  subscription: Subscription | null
}

export interface FormPresenterProps {
  categories: Category[]
  methods: Method[]
  subscriptionTitle: string
  setSubscriptionTitle: Dispatch<SetStateAction<string>>
  subscriptionValue: string
  setSubscriptionValue: Dispatch<SetStateAction<string>>
  selectedCategoryValue: number
  setSelectedCategoryValue: Dispatch<SetStateAction<number>>
  selectedMethodValue: number
  setSelectedMethodValue: Dispatch<SetStateAction<number>>
  handleSaveSubscription: () => void
}
