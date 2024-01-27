import { FC } from 'react'

import { Form } from './Form'
import { RecordFormPresenterProps } from './types'

export const RecordFormPresenter: FC<RecordFormPresenterProps> = ({ record }) => {
  return <Form record={record} />
}
