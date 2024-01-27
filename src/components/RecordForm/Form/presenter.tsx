import { FC, useMemo, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View } from 'react-native'

import { Button } from '@/components/commons/Button'
import { FormLabel } from '@/components/commons/FormLabel'
import { Picker } from '@/components/commons/Picker'
import { PickerTrigger } from '@/components/commons/PickerTrigger'
import { useTheme } from '@/styles/hooks'

import { FormPresenterProps } from './types'

export const FormPresenter: FC<FormPresenterProps> = ({
  categories,
  methods,
  recordTitle,
  setRecordTitle,
  recordValue,
  setRecordValue,
  selectedCategoryValue,
  setSelectedCategoryValue,
  selectedMethodValue,
  setSelectedMethodValue,
  handleSaveRecord
}) => {
  const styles = useStyles()
  const theme = useTheme()

  const valueInputRef = useRef<TextInput>(null)

  const [categoryPickerExpanded, setCategoryPickerExpanded] = useState(false)
  const [methodPickerExpanded, setMethodPickerExpanded] = useState(false)

  const categoryPickerItems = useMemo(() => {
    const items = [{ label: '選択してください', value: 0 }]
    for (const category of categories) {
      items.push({ label: category.name, value: category.id })
    }

    return items
  }, [categories])

  const methodPickerItems = useMemo(() => {
    const items = [{ label: '選択してください', value: 0 }]
    for (const method of methods) {
      items.push({ label: method.name, value: method.id })
    }

    return items
  }, [methods])

  const selectedCategoryName = useMemo(() => {
    return categoryPickerItems.find((item) => item.value === selectedCategoryValue)?.label ?? ''
  }, [categoryPickerItems, selectedCategoryValue])

  const selectedMethodName = useMemo(() => {
    return methodPickerItems.find((item) => item.value === selectedMethodValue)?.label ?? ''
  }, [methodPickerItems, selectedMethodValue])

  const handleChangeRecordTitle = (text: string) => {
    setRecordTitle(text)
  }

  const handleChangeRecordValue = (text: string) => {
    setRecordValue(text)
  }

  const handleChangeCategory = (categoryId: number) => {
    setSelectedCategoryValue(categoryId)
  }

  const handleChangeMethod = (methodId: number) => {
    setSelectedMethodValue(methodId)
  }

  const toggleCategoryPickerExpanded = () => {
    setCategoryPickerExpanded((currentState) => !currentState)
  }

  const toggleMethodPickerExpanded = () => {
    setMethodPickerExpanded((currentState) => !currentState)
  }

  const focusValueInput = () => {
    valueInputRef.current?.focus()
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.sectionContainer}>
        <FormLabel>お店や品目</FormLabel>
        <TextInput
          value={recordTitle}
          onChangeText={handleChangeRecordTitle}
          style={styles.textInput}
          selectionColor={theme.colors.app.primary.main}
          returnKeyType="next"
          onSubmitEditing={focusValueInput}
        />
      </View>

      <View style={styles.sectionContainer}>
        <FormLabel>金額</FormLabel>
        <TextInput
          ref={valueInputRef}
          value={recordValue}
          onChangeText={handleChangeRecordValue}
          style={styles.textInput}
          selectionColor={theme.colors.app.primary.main}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.sectionContainer}>
        <FormLabel>カテゴリー</FormLabel>
        <PickerTrigger
          selectedItemText={selectedCategoryName}
          onPress={toggleCategoryPickerExpanded}
        />
        <Picker
          items={categoryPickerItems}
          selectedValue={selectedCategoryValue}
          handleChangeValue={handleChangeCategory}
          expanded={categoryPickerExpanded}
        />
      </View>

      <View style={styles.sectionContainer}>
        <FormLabel>支払い方法</FormLabel>
        <PickerTrigger selectedItemText={selectedMethodName} onPress={toggleMethodPickerExpanded} />
        <Picker
          items={methodPickerItems}
          selectedValue={selectedMethodValue}
          handleChangeValue={handleChangeMethod}
          expanded={methodPickerExpanded}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleSaveRecord}>
          保存
        </Button>
      </View>
    </ScrollView>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.sub,
        flex: 1,
        width: '100%'
      },
      contentContainer: {
        paddingHorizontal: theme.styles.padding.medium,
        paddingVertical: theme.styles.padding.small
      },
      sectionContainer: {
        marginBottom: theme.styles.margin.medium
      },
      buttonContainer: {
        marginVertical: theme.styles.margin.medium
      },
      textInput: {
        backgroundColor: theme.colors.background.main,
        borderColor: theme.colors.border.main,
        borderRadius: theme.styles.borderRadius.medium,
        borderWidth: 1,
        color: theme.colors.font.main,
        fontSize: theme.styles.fontSize.medium,
        paddingHorizontal: theme.styles.padding.xSmall,
        paddingVertical: theme.styles.padding.small
      },
      button: {
        alignSelf: 'center',
        width: 200
      }
    })
  }, [theme])

  return styles
}
