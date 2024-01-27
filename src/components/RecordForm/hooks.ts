import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

import { useGetRecord } from '@/hooks/records'
import { IORecord } from '@/types/records'

export const useRecord = () => {
  const searchParams = useLocalSearchParams<{ id: string }>()

  const getRecord = useGetRecord()

  const [record, setRecord] = useState<IORecord | null | undefined>()

  useEffect(() => {
    const recordId = Number(searchParams.id)
    if (!recordId) {
      setRecord(null)
      return
    }

    getRecord(recordId)
      .then((responseData) => {
        setRecord(responseData)
      })
      .catch(() => {})
  }, [searchParams.id, getRecord])

  return record
}
