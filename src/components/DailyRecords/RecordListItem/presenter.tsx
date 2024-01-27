import { FC, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ActionSheet } from '@/components/commons/ActionSheet'
import { ActionSheetItem } from '@/components/commons/ActionSheetItem'
import {
  ActionSheetCancelItemWrapper,
  ActionSheetItemWrapper
} from '@/components/commons/ActionSheetItemWrapper'
import { ListItem } from '@/components/commons/ListItem'
import { useTheme } from '@/styles/hooks'

import { RecordListItemPresenterProps } from './types'

export const RecordListItemPresenter: FC<RecordListItemPresenterProps> = ({
  record,
  category,
  handleDeleteRecord
}) => {
  const styles = useStyles()

  const [actionSheetVisible, setActionSheetVisible] = useState(false)

  const openActionSheet = () => {
    setActionSheetVisible(true)
  }

  const closeActionSheet = () => {
    setActionSheetVisible(false)
  }

  const onPressDeleteButton = () => {
    handleDeleteRecord()
    closeActionSheet()
  }

  return (
    <>
      <ListItem containerStyle={styles.container} onLongPress={openActionSheet}>
        <View style={styles.name}>
          <Text style={styles.nameText}>{record.name}</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>{record.value.toLocaleString('ja-jp')}</Text>
        </View>
        <View style={styles.category}>
          <Text style={styles.categoryText}>{category?.name}</Text>
        </View>
      </ListItem>

      <ActionSheet show={actionSheetVisible} onBackDropPress={closeActionSheet}>
        <ActionSheetItemWrapper>
          <ActionSheetItem
            label="削除"
            labelStyle={styles.deleteButtonLabel}
            onPress={onPressDeleteButton}
          />
        </ActionSheetItemWrapper>

        <ActionSheetCancelItemWrapper>
          <ActionSheetItem label="キャンセル" onPress={closeActionSheet} />
        </ActionSheetCancelItemWrapper>
      </ActionSheet>
    </>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.main,
        borderBottomColor: theme.colors.border.main,
        borderBottomWidth: 1
      },
      name: {
        flex: 2,
        paddingHorizontal: theme.styles.padding.xxSmall
      },
      nameText: {
        color: theme.colors.font.main,
        fontSize: theme.styles.fontSize.small
      },
      value: {
        flex: 1,
        paddingHorizontal: theme.styles.padding.xxSmall
      },
      valueText: {
        color: theme.colors.font.error,
        fontSize: theme.styles.fontSize.small,
        textAlign: 'right'
      },
      category: {
        paddingHorizontal: theme.styles.padding.xxSmall,
        width: 80
      },
      categoryText: {
        color: theme.colors.font.main,
        fontSize: 14
      },
      deleteButtonLabel: {
        color: theme.colors.font.error
      }
    })
  }, [theme])

  return styles
}
