import { router } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { FC, useState } from 'react'

import { CloseButton } from '@/components/commons/CloseButton'
import { useInsertRecord } from '@/hooks/records'
import { useCategories } from '@/store/categories'
import { useSelectedDate } from '@/store/date'
import { useMethods } from '@/store/methods'
import { RECORD_TYPES } from '@/types/records'

import { FormPresenter } from './presenter'

export const Form: FC = () => {
  const categories = useCategories((state) => state.categories)
  const methods = useMethods((state) => state.methods)
  const selectedDate = useSelectedDate((state) => state.selectedDate)

  const insertRecord = useInsertRecord()

  const [recordTitle, setRecordTitle] = useState('')
  const [recordValue, setRecordValue] = useState('')

  const [selectedCategoryValue, setSelectedCategoryValue] = useState(0)
  const [selectedMethodValue, setSelectedMethodValue] = useState(0)

  const handleSaveRecord = () => {
    const values = {
      name: recordTitle.trim(),
      value: Number(recordValue.trim()),
      type: RECORD_TYPES.expenses,
      categoryId: selectedCategoryValue || null,
      methodId: selectedMethodValue,
      date: selectedDate.toISOString()
    }

    if (!values.name || !values.value || !values.methodId) {
      return
    }

    insertRecord(values)
      .then(() => {
        setRecordTitle('')
        setRecordValue('')
      })
      .catch(() => {})
  }

  return (
    <>
      <Stack.Screen options={{ headerRight: () => <CloseButton onPress={router.back} /> }} />
      <FormPresenter
        categories={categories}
        methods={methods}
        recordTitle={recordTitle}
        setRecordTitle={setRecordTitle}
        recordValue={recordValue}
        setRecordValue={setRecordValue}
        selectedCategoryValue={selectedCategoryValue}
        setSelectedCategoryValue={setSelectedCategoryValue}
        selectedMethodValue={selectedMethodValue}
        setSelectedMethodValue={setSelectedMethodValue}
        handleSaveRecord={handleSaveRecord}
      />
    </>
  )
}
