import React, {
  useState, useMemo, useRef, useCallback,
} from 'react';
import {
  StyleSheet, View, Text, TextInput, Pressable,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import FormGroupContainer from '@components/commons/FormGroupContainer';
import RadioButton from '@components/commons/RadioButton';
import InputAccessoryView from '@components/commons/InputAccessoryView';
import Picker, { PickerItem } from '@components/commons/Picker';
import Button from '@components/commons/Button';
import { categoriesState } from '@store/categories/atom';
import { methodsState } from '@store/methods/atom';
import { RecordTypes, RecordType } from '@store/records/types';
import { colors } from '@styles/color';
import { BASE_PADDING } from '@styles/index';

interface RecordFormProps {
  isEdit?: boolean;
  defaultValues?: {
    name: string;
    value: number;
    type: RecordType;
    categoryId: number | null;
    methodId: number;
  };
  saveRecord: (params: {
    name: string;
    value: number;
    type: RecordType;
    category: { id: number; name: string } | null;
    method: { id: number; name: string };
  }) => void;
}

const RecordForm = (props: RecordFormProps) => {
  const {
    isEdit = false,
    defaultValues,
    saveRecord,
  } = props;

  const categories = useRecoilValue(categoriesState);
  const methods = useRecoilValue(methodsState);

  const itemValueInputRef = useRef<TextInput>(null);

  const [recordType, setRecordType] = useState<RecordType>(RecordTypes.expenses);
  const [itemName, setItemName] = useState(defaultValues ? defaultValues.name : '');
  const [itemValue, setItemValue] = useState(defaultValues ? defaultValues.value : 0);
  const [
    selectedCategoryValue,
    setSelectedCategoryValue,
  ] = useState<number | null>(defaultValues ? defaultValues.categoryId : null);

  const [
    selectedMethodValue,
    setSelectedMethodValue,
  ] = useState<number>(defaultValues ? defaultValues.methodId : methods[0].id);

  const [categoryPickerVisible, setCategoryPickerVisible] = useState(false);
  const [methodPickerVisible, setMethodPickerVisible] = useState(false);

  const itemValueLabel = useMemo(() => {
    if (!itemValue) {
      return '';
    }

    return String(itemValue);
  }, [itemValue]);

  const categoryPickerItems = useMemo(() => {
    const itemList = categories.map(
      (category) => ({ label: category.name, value: category.id }),
    );

    return [{ label: 'なし', value: '' }, ...itemList];
  }, [categories]);

  const methodPickerItems = useMemo(
    () => methods.map((method) => ({ label: method.name, value: method.id })),
    [methods],
  );

  const selectedCategoryLabel = useMemo(() => {
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryValue,
    );

    return selectedCategory ? selectedCategory.name : '';
  }, [categories, selectedCategoryValue]);

  const selectedMethodLabel = useMemo(() => {
    const selectedMethod = methods.find((method) => method.id === selectedMethodValue);

    return selectedMethod ? selectedMethod.name : '';
  }, [methods, selectedMethodValue]);

  const onPressButton = useCallback(() => {
    saveRecord({
      name: itemName,
      value: itemValue,
      type: recordType,
      category:
        selectedCategoryValue ? { id: selectedCategoryValue, name: selectedCategoryLabel } : null,
      method: { id: selectedMethodValue, name: selectedMethodLabel },
    });
    setItemName('');
    setItemValue(0);
  }, [
    saveRecord,
    itemName,
    itemValue,
    recordType,
    selectedCategoryLabel,
    selectedCategoryValue,
    selectedMethodLabel,
    selectedMethodValue,
  ]);

  return (
    <>
      <View style={styles.formContainer}>
        <FormGroupContainer
          containerStyle={styles.recordTypeCntainer}
          style={styles.recordType}
          onPress={() => setRecordType(RecordTypes.expenses)}
        >
          <RadioButton checked={recordType === RecordTypes.expenses} />
          <Text style={styles.recordTypeLabel}>支出</Text>
        </FormGroupContainer>
        <FormGroupContainer
          containerStyle={styles.recordTypeCntainer}
          style={styles.recordType}
          onPress={() => setRecordType(RecordTypes.incomes)}
        >
          <RadioButton checked={recordType === RecordTypes.incomes} />
          <Text style={styles.recordTypeLabel}>収入</Text>
        </FormGroupContainer>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.itemNameInput}
          selectionColor={colors.textInput.caret}
          placeholderTextColor={colors.placeholder.default}
          placeholder="お店や品目"
          returnKeyType="next"
          value={itemName}
          onChangeText={(text) => setItemName(text)}
          inputAccessoryViewID="RecordScreenInput"
          onSubmitEditing={() => itemValueInputRef.current?.focus()}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          ref={itemValueInputRef}
          style={styles.itemValueInput}
          selectionColor={colors.textInput.caret}
          placeholderTextColor={colors.placeholder.default}
          placeholder="金額"
          returnKeyType="next"
          keyboardType="numeric"
          value={itemValueLabel}
          onChangeText={(text) => setItemValue(parseInt(text, 10))}
          inputAccessoryViewID="RecordScreenInput"
        />
        <InputAccessoryView nativeID="RecordScreenInput" />
      </View>
      <View style={styles.formContainer}>
        <Pressable style={styles.categoryInput} onPress={() => setCategoryPickerVisible(true)}>
          {selectedCategoryLabel
            ? <Text style={styles.categoryInputText}>{selectedCategoryLabel}</Text>
            : <Text style={styles.placeholder}>カテゴリー</Text>}
          <Picker
            show={categoryPickerVisible}
            selectedValue={selectedCategoryValue}
            onValueChange={(value) => setSelectedCategoryValue(value)}
            onDonePress={() => setCategoryPickerVisible(false)}
          >
            {categoryPickerItems.map((item) => (
              <PickerItem key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </Pressable>
        <Pressable style={styles.methodInput} onPress={() => setMethodPickerVisible(true)}>
          {selectedMethodLabel
            ? <Text style={styles.methodInputText}>{selectedMethodLabel}</Text>
            : <Text style={styles.placeholder}>支払い方法</Text>}
          <Picker
            show={methodPickerVisible}
            selectedValue={selectedMethodValue}
            onValueChange={(value) => setSelectedMethodValue(value)}
            onDonePress={() => setMethodPickerVisible(false)}
          >
            {methodPickerItems.map((item) => (
              <PickerItem key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </Pressable>
      </View>
      <View style={styles.formContainer}>
        <Button onPress={onPressButton} label={isEdit ? '更新' : '追加'} containerStyle={styles.buttonContainer} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    paddingHorizontal: BASE_PADDING,
    width: '100%',
  },
  recordTypeCntainer: {
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  recordType: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recordTypeLabel: {
    color: colors.font.default,
    fontSize: 16,
    marginLeft: 5,
  },
  itemNameInput: {
    borderBottomColor: colors.textInput.border,
    borderBottomWidth: 1,
    flex: 1,
    color: colors.font.default,
    fontSize: 20,
    paddingLeft: 3,
    paddingVertical: 3,
  },
  itemValueInput: {
    borderBottomColor: colors.textInput.border,
    borderBottomWidth: 1,
    color: colors.font.default,
    flex: 1,
    fontSize: 20,
    paddingLeft: 3,
    paddingVertical: 3,
  },
  categoryInput: {
    borderBottomColor: colors.textInput.border,
    borderBottomWidth: 1,
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  categoryInputText: {
    color: colors.font.default,
    fontSize: 20,
  },
  methodInput: {
    borderBottomColor: colors.textInput.border,
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 20,
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  methodInputText: {
    color: colors.font.default,
    fontSize: 20,
  },
  buttonContainer: {
    width: 150,
  },
  placeholder: {
    color: colors.placeholder.default,
    fontSize: 20,
  },
});

export default RecordForm;
