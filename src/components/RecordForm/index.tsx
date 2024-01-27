import { FC } from 'react'

import { useRecord } from './hooks'
import { RecordFormPresenter } from './presenter'

export const RecordForm: FC = () => {
  const record = useRecord()

  if (record === undefined) {
    return null
  }

  return <RecordFormPresenter record={record} />
}
