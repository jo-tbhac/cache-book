import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RecordType, RecordTypes } from '@store/records/types';
import { colors } from '@styles/color';

interface RecordListItemProps {
  dateString?: string;
  previousDateString?: string;
  name: string;
  value: number;
  type: RecordType;
  category?: string;
  method: string;
  totalExpenses?: number;
}

const RecordListItem = (props: RecordListItemProps) => {
  const {
    dateString,
    previousDateString,
    name,
    value,
    type,
    method,
    category,
    totalExpenses,
  } = props;

  const fontColor = {
    color: type === RecordTypes.incomes ? colors.font.default : colors.font.alert,
  };

  const dateVisible = dateString && dateString === previousDateString;
  const showDate = dateString !== undefined;
  const showCategory = category !== undefined;
  const showTotalExpenses = totalExpenses !== undefined;

  return (
    <View style={styles.container}>
      {showDate && (
        <View style={styles.date}>
          <Text style={[styles.dateText, fontColor, dateVisible && { color: 'transparent' }]}>
            {dateString}
          </Text>
        </View>
      )}
      <View style={styles.name}>
        <Text style={[styles.nameText, fontColor]}>{name}</Text>
      </View>
      <View style={styles.value}>
        <Text style={[styles.valueText, fontColor]}>{value.toLocaleString('ja-jp')}</Text>
      </View>
      <View style={styles.method}>
        <Text style={[styles.methodText, fontColor]}>{method}</Text>
      </View>
      {showTotalExpenses && (
        <View style={styles.totalExpenses}>
          <Text style={[styles.totalExpensesText, fontColor]}>
            {totalExpenses.toLocaleString('ja-jp')}
          </Text>
        </View>
      )}
      {showCategory && (
        <View style={styles.category}>
          <Text style={[styles.categoryText, fontColor]}>{category}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.list.background,
    borderBottomColor: colors.list.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  date: {
    paddingHorizontal: 3,
  },
  dateText: {
    fontSize: 14,
  },
  name: {
    flex: 2,
    paddingHorizontal: 3,
  },
  nameText: {
    fontSize: 14,
  },
  value: {
    flex: 1,
    paddingHorizontal: 3,
  },
  valueText: {
    fontSize: 14,
    textAlign: 'right',
  },
  category: {
    paddingHorizontal: 3,
    width: 80,
  },
  categoryText: {
    fontSize: 14,
  },
  method: {
    flex: 1,
    paddingHorizontal: 3,
  },
  methodText: {
    fontSize: 14,
  },
  totalExpenses: {
    paddingHorizontal: 3,
    width: 80,
  },
  totalExpensesText: {
    fontSize: 14,
    textAlign: 'right',
  },
});

export default RecordListItem;
