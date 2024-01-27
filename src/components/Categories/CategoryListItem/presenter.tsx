import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { FC, useMemo, useState } from 'react'
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputEndEditingEventData
} from 'react-native'

import { ActionSheet } from '@/components/commons/ActionSheet'
import { ActionSheetItem } from '@/components/commons/ActionSheetItem'
import {
  ActionSheetCancelItemWrapper,
  ActionSheetItemWrapper
} from '@/components/commons/ActionSheetItemWrapper'
import { ListItem } from '@/components/commons/ListItem'
import { useTheme } from '@/styles/hooks'

import { CategoryListItemPresenterProps } from './types'

export const CategoryListItemPresenter: FC<CategoryListItemPresenterProps> = ({
  category,
  handleSaveCategory,
  handleDeleteCategory
}) => {
  const styles = useStyles()
  const theme = useTheme()

  const [editMode, setEditMode] = useState(false)
  const [actionSheetVisible, setActionSheetVisible] = useState(false)

  const openEditMode = () => {
    setEditMode(true)
  }

  const closeEditMode = () => {
    setEditMode(false)
  }

  const openActionSheet = () => {
    setActionSheetVisible(true)
  }

  const closeActionSheet = () => {
    setActionSheetVisible(false)
  }

  const onPressDeleteButton = () => {
    handleDeleteCategory()
    closeActionSheet()
  }

  const onSubmitEditing = (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    handleSaveCategory({ name: event.nativeEvent.text })
    closeEditMode()
  }

  const onBlur = () => {
    closeEditMode()
  }

  if (editMode) {
    return (
      <ListItem containerStyle={styles.container}>
        <TextInput
          defaultValue={category?.name ?? ''}
          autoFocus
          selectionColor={theme.colors.app.primary.main}
          style={styles.textInput}
          returnKeyType="done"
          onSubmitEditing={onSubmitEditing}
          onBlur={onBlur}
        />
      </ListItem>
    )
  }

  return (
    <>
      <ListItem
        containerStyle={styles.container}
        onPress={openEditMode}
        onLongPress={category == null ? undefined : openActionSheet}
      >
        {category == null ? (
          <>
            <FontAwesome name="plus" style={styles.icon} color={theme.colors.font.sub} />
            <Text style={styles.label}>支払い方法を追加</Text>
          </>
        ) : (
          <Text style={styles.label}>{category.name}</Text>
        )}
      </ListItem>

      <ActionSheet show={actionSheetVisible} onBackDropPress={closeActionSheet}>
        <ActionSheetItemWrapper>
          <ActionSheetItem
            label="カテゴリーを削除"
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
      icon: {
        marginRight: theme.styles.margin.xxSmall
      },
      label: {
        color: theme.colors.font.main
      },
      textInput: {
        color: theme.colors.font.main
      },
      deleteButtonLabel: {
        color: theme.colors.font.error
      }
    })
  }, [theme])

  return styles
}
