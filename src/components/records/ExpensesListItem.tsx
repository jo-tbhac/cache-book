import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@styles/color';

interface ExpensesListItemProps {
  name: string;
  value: number;
}

const ExpensesListItem = (props: ExpensesListItemProps) => {
  const { name, value } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.value}>{value.toLocaleString('ja-jp')}</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: '100%',
  },
  name: {
    color: colors.font.default,
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 3,
  },
  value: {
    color: colors.font.default,
    fontSize: 18,
    paddingHorizontal: 3,
  },
});

export default ExpensesListItem;
