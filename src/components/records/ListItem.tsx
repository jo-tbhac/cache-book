import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RecordType, RecordTypes } from '@store/records/types';
import { colors } from '@styles/color';

interface RecordListItemProps {
  name: string;
  value: number;
  type: RecordType;
  category: string;
  method: string;
}

const RecordListItem = (props: RecordListItemProps) => {
  const {
    name,
    value,
    type,
    method,
    category,
  } = props;

  const fontColor = {
    color: type === RecordTypes.incomes ? colors.font.default : colors.font.alert,
  };

  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={[styles.nameText, fontColor]}>{name}</Text>
      </View>
      <View style={styles.value}>
        <Text style={[styles.valueText, fontColor]}>{value.toLocaleString('ja-jp')}</Text>
      </View>
      <View style={styles.method}>
        <Text style={[styles.methodText, fontColor]}>{method}</Text>
      </View>
      <View style={styles.category}>
        <Text style={[styles.categoryText, fontColor]}>{category}</Text>
      </View>
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
    flex: 1,
    paddingHorizontal: 3,
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
});

export default RecordListItem;
