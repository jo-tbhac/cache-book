import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { FC, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { ActionSheet } from '@/components/commons/ActionSheet'
import { ActionSheetItem } from '@/components/commons/ActionSheetItem'
import {
  ActionSheetCancelItemWrapper,
  ActionSheetItemWrapper
} from '@/components/commons/ActionSheetItemWrapper'
import { FloatButton } from '@/components/commons/FloatButton'
import { useTheme } from '@/styles/hooks'

import { Header } from './Header'
import { RecordList } from './RecordList'
import { DailyRecordsPresenterProps } from './types'

export const DailyRecordsPresenter: FC<DailyRecordsPresenterProps> = ({
  navigateFormPage,
  componentKey,
  actionSheetVisible,
  openActionSheet,
  closeActionSheet,
  handleImportSubscriptions
}) => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <Header />
      <RecordList key={componentKey} />

      <FloatButton onPress={navigateFormPage} onLongPress={openActionSheet}>
        <FontAwesome name="plus" color={theme.colors.font.contrast} size={32} />
      </FloatButton>

      <ActionSheet show={actionSheetVisible} onBackDropPress={closeActionSheet}>
        <ActionSheetItemWrapper>
          <ActionSheetItem
            label="サブスクリプションのレコードを追加"
            onPress={handleImportSubscriptions}
          />
        </ActionSheetItemWrapper>

        <ActionSheetCancelItemWrapper>
          <ActionSheetItem label="キャンセル" onPress={closeActionSheet} />
        </ActionSheetCancelItemWrapper>
      </ActionSheet>
    </View>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.main,
        flex: 1,
        width: '100%'
      }
    })
  }, [theme])

  return styles
}
