import { FC } from 'react'

import { Form } from './Form'
import { SubscriptionFormPresenterProps } from './types'

export const SubscriptionFormPresenter: FC<SubscriptionFormPresenterProps> = ({ subscription }) => {
  return <Form subscription={subscription} />
}
