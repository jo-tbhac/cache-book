import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import ExpensesListItem from '@components/records/ExpensesListItem';
import RecordHeader from '@components/records/Header';
import { expensesByCategorySelector } from '@store/records/selector';
import { colors } from '@styles/color';

const IndexByCategoryScreen = () => {
  const expensesByCategory = useRecoilValue(expensesByCategorySelector);

  return (
    <View style={styles.container}>
      <RecordHeader type="month" />
      <FlatList
        data={expensesByCategory}
        renderItem={({ item }) => (
          <ExpensesListItem name={item.name} value={item.value} />
        )}
        style={styles.body}
      />
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
  body: {
    flex: 1,
    width: '100%',
  },
});

export default IndexByCategoryScreen;
