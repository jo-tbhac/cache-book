import { useEffect, useState } from 'react'

import { useGetSubscriptions } from '@/hooks/subscriptions'
import { Subscription } from '@/types/subscriptions'

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(null)

  const getSubscriptions = useGetSubscriptions()

  useEffect(() => {
    getSubscriptions()
      .then((responseData) => {
        setSubscriptions(responseData)
      })
      .catch(() => {})
  }, [getSubscriptions])

  return { subscriptions, setSubscriptions }
}
