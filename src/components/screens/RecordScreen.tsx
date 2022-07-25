import React, { useState, useMemo, useRef } from 'react';
import {
  StyleSheet, Text, View, TextInput, Pressable, FlatList,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import FormGroupContainer from '@components/commons/FormGroupContainer';
import RadioButton from '@components/commons/RadioButton';
import InputAccessoryView from '@components/commons/InputAccessoryView';
import Picker, { PickerItem } from '@components/commons/Picker';
import Button from '@components/commons/Button';
import RecordListItem from '@components/records/ListItem';
import { categoriesSelector } from '@store/categories/selector';
import { methodsSelector } from '@store/methods/selector';
import { dailyRecordsSelector } from '@store/records/selector';
import { RecordTypes, RecordType } from '@store/records/types';
import { colors } from '@styles/color';
import { BASE_PADDING } from '@styles/index';

const RecordScreen = () => {
  const categories = useRecoilValue(categoriesSelector);
  const methods = useRecoilValue(methodsSelector);
  const records = useRecoilValue(dailyRecordsSelector);

  const itemValueInputRef = useRef<TextInput>(null);

  const [recordType, setRecordType] = useState<RecordType>(RecordTypes.expenses);
  const [itemName, setItemName] = useState('');
  const [itemValue, setItemValue] = useState(0);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState<number | null>(null);
  const [selectedMethodValue, setSelectedMethodValue] = useState<string | null>(null);

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

  const totalExpenses = useMemo(() => {
    let total = 0;
    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];
      if (record.type === RecordTypes.expenses) {
        total += record.value;
      }
    }

    return total;
  }, [records]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {dayjs().format('YYYY/MM/DD')}
          の記録
        </Text>
      </View>
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
          onSubmitEditing={() => itemValueInputRef.current.focus()}
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
        <Button onPress={() => {}} label="追加" containerStyle={styles.buttonContainer} />
      </View>
      <FlatList
        data={records}
        renderItem={({ item }) => (
          <RecordListItem
            name={item.name}
            value={item.value}
            type={item.type}
            method={item.method}
            category={item.category}
          />
        )}
        style={styles.recordList}
        contentContainerStyle={styles.recordListContainer}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>支出合計</Text>
        <Text style={styles.totalValue}>{totalExpenses.toLocaleString('ja-jp')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.screen.background,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  header: {
    marginBottom: 30,
    paddingHorizontal: BASE_PADDING,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  recordList: {
    flex: 1,
    width: '100%',
  },
  recordListContainer: {
    paddingHorizontal: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: BASE_PADDING,
    paddingTop: 20,
  },
  totalLabel: {
    color: colors.font.default,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  totalValue: {
    color: colors.font.default,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
});

export default RecordScreen;
