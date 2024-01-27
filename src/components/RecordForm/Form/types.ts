import { Dispatch, SetStateAction } from 'react'

import { Category } from '@/types/categories'
import { Method } from '@/types/methods'
import { IORecord } from '@/types/records'

export interface FormProps {
  record: IORecord | null
}

export interface FormPresenterProps {
  categories: Category[]
  methods: Method[]
  recordTitle: string
  setRecordTitle: Dispatch<SetStateAction<string>>
  recordValue: string
  setRecordValue: Dispatch<SetStateAction<string>>
  selectedCategoryValue: number
  setSelectedCategoryValue: Dispatch<SetStateAction<number>>
  selectedMethodValue: number
  setSelectedMethodValue: Dispatch<SetStateAction<number>>
  handleSaveRecord: () => void
}
