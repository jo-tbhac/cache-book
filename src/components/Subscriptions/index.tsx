import { router, useLocalSearchParams } from 'expo-router'
import { FC, useEffect, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

import { SubscriptionsPresenter } from './presenter'

export const Subscriptions: FC = () => {
  const [componentKey, setComponentKey] = useState(uuidV4)

  const searchParams = useLocalSearchParams<{ key?: string }>()

  useEffect(() => {
    if (searchParams.key == null) {
      return
    }
    setComponentKey(searchParams.key)
  }, [searchParams.key])

  const navigateFormPage = () => {
    router.push('subscription-form')
  }

  return <SubscriptionsPresenter navigateFormPage={navigateFormPage} componentKey={componentKey} />
}
