import { router } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { FC, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

import { CloseButton } from '@/components/commons/CloseButton'
import { useInsertSubscription, useUpdateSubscription } from '@/hooks/subscriptions'
import { useCategories } from '@/store/categories'
import { useMethods } from '@/store/methods'

import { FormPresenter } from './presenter'
import { FormProps } from './types'

export const Form: FC<FormProps> = ({ subscription }) => {
  const categories = useCategories((state) => state.categories)
  const methods = useMethods((state) => state.methods)

  const insertSubscription = useInsertSubscription()
  const updateSubscription = useUpdateSubscription()

  const [subscriptionTitle, setSubscriptionTitle] = useState(subscription?.name ?? '')
  const [subscriptionValue, setSubscriptionValue] = useState(subscription?.value.toString() ?? '')
  const [changed, setChanged] = useState(false)

  const [selectedCategoryValue, setSelectedCategoryValue] = useState(subscription?.categoryId ?? 0)
  const [selectedMethodValue, setSelectedMethodValue] = useState(subscription?.methodId ?? 0)

  const handleSaveSubscription = () => {
    const values = {
      name: subscriptionTitle.trim(),
      value: Number(subscriptionValue.trim()),
      categoryId: selectedCategoryValue || null,
      methodId: selectedMethodValue
    }

    if (!values.name || !values.value || !values.methodId) {
      return
    }

    if (subscription == null) {
      insertSubscription(values)
        .then(() => {
          setChanged(true)
          setSubscriptionTitle('')
          setSubscriptionValue('')
        })
        .catch(() => {})

      return
    }

    updateSubscription(subscription.id, values)
      .then(() => {
        setChanged(true)
      })
      .catch(() => {})
  }

  const goBackSubscriptionsPage = () => {
    const searchParams = changed ? `?key=${uuidV4()}` : ''
    router.navigate(`subscriptions${searchParams}`)
  }

  return (
    <>
      <Stack.Screen
        options={{ headerRight: () => <CloseButton onPress={goBackSubscriptionsPage} /> }}
      />
      <FormPresenter
        categories={categories}
        methods={methods}
        subscriptionTitle={subscriptionTitle}
        setSubscriptionTitle={setSubscriptionTitle}
        subscriptionValue={subscriptionValue}
        setSubscriptionValue={setSubscriptionValue}
        selectedCategoryValue={selectedCategoryValue}
        setSelectedCategoryValue={setSelectedCategoryValue}
        selectedMethodValue={selectedMethodValue}
        setSelectedMethodValue={setSelectedMethodValue}
        handleSaveSubscription={handleSaveSubscription}
      />
    </>
  )
}
