import { router } from 'expo-router'
import { FC, useMemo } from 'react'

import { useDeleteSubscription } from '@/hooks/subscriptions'
import { useCategories } from '@/store/categories'

import { SubscriptionListItemPresenter } from './presenter'
import { SubscriptionListItemProps } from './types'

export const SubscriptionListItem: FC<SubscriptionListItemProps> = ({
  subscription,
  setSubscriptions
}) => {
  const categories = useCategories((state) => state.categories)

  const deleteSubscription = useDeleteSubscription()

  const category = useMemo(() => {
    return categories.find((category) => category.id === subscription.categoryId)
  }, [categories, subscription.categoryId])

  const navigateEditSubscriptionPage = () => {
    router.push(`subscription-form?id=${subscription.id}`)
  }

  const handleDeleteSubscription = () => {
    deleteSubscription(subscription.id)
      .then(() => {
        setSubscriptions((currentSubscriptions) => {
          if (currentSubscriptions == null) {
            return currentSubscriptions
          }
          return currentSubscriptions.filter(({ id }) => id !== subscription.id)
        })
      })
      .catch(() => {})
  }

  return (
    <SubscriptionListItemPresenter
      subscription={subscription}
      category={category}
      navigateEditSubscriptionPage={navigateEditSubscriptionPage}
      handleDeleteSubscription={handleDeleteSubscription}
    />
  )
}
