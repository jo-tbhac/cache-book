import { router } from 'expo-router'
import { FC, useMemo } from 'react'

import { useDeleteRecord } from '@/hooks/records'
import { useCategories } from '@/store/categories'

import { RecordListItemPresenter } from './presenter'
import { RecordListItemProps } from './types'

export const RecordListItem: FC<RecordListItemProps> = ({ record, setDailyRecords }) => {
  const categories = useCategories((state) => state.categories)

  const deleteRecord = useDeleteRecord()

  const category = useMemo(() => {
    return categories.find((category) => category.id === record.categoryId)
  }, [categories, record.categoryId])

  const navigateEditRecordPage = () => {
    router.push(`record-form?id=${record.id}`)
  }

  const handleDeleteRecord = () => {
    deleteRecord(record.id)
      .then(() => {
        setDailyRecords((currentRecords) => {
          if (currentRecords == null) {
            return currentRecords
          }
          return currentRecords.filter(({ id }) => id !== record.id)
        })
      })
      .catch(() => {})
  }

  return (
    <RecordListItemPresenter
      record={record}
      category={category}
      navigateEditRecordPage={navigateEditRecordPage}
      handleDeleteRecord={handleDeleteRecord}
    />
  )
}
