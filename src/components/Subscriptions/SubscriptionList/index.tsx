import { FC } from 'react'

import { useSubscriptions } from './hooks'
import { SubscriptionListPresenter } from './presenter'

export const SubscriptionList: FC = () => {
  const { subscriptions, setSubscriptions } = useSubscriptions()

  if (subscriptions == null) {
    return null
  }

  return (
    <SubscriptionListPresenter subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
  )
}
