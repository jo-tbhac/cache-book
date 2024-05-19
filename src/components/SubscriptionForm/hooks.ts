import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

import { useGetSubscription } from '@/hooks/subscriptions'
import { Subscription } from '@/types/subscriptions'

export const useSubscription = () => {
  const searchParams = useLocalSearchParams<{ id: string }>()

  const getSubscription = useGetSubscription()

  const [subscription, setSubscription] = useState<Subscription | null | undefined>()

  useEffect(() => {
    const subscriptionId = Number(searchParams.id)
    if (!subscriptionId) {
      setSubscription(null)
      return
    }

    getSubscription(subscriptionId)
      .then((responseData) => {
        setSubscription(responseData)
      })
      .catch(() => {})
  }, [searchParams.id, getSubscription])

  return subscription
}
