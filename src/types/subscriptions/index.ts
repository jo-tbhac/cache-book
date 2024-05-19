export interface Subscription {
  id: number
  name: string
  value: number
  categoryId: number | null
  methodId: number
}

export type SubscriptionListItem = Omit<Subscription, 'categoryId' | 'methodId'> & {
  category: string
  method: string
}
