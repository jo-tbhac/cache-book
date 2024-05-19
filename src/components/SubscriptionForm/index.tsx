import { FC } from 'react'

import { useSubscription } from './hooks'
import { SubscriptionFormPresenter } from './presenter'

export const SubscriptionForm: FC = () => {
  const subscription = useSubscription()

  if (subscription === undefined) {
    return null
  }

  return <SubscriptionFormPresenter subscription={subscription} />
}
