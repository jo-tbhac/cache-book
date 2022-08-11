import React, { useMemo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import ExpensesListItem from '@components/records/ExpensesListItem';
import RecordHeader from '@components/records/Header';
import { selectedMonthState } from '@store/date/atom';
import { expensesByCategorySelector } from '@store/records/selector';
import { colors } from '@styles/color';

const IndexByCategoryScreen = () => {
  const [selectedMonth, setSelectedMonth] = useRecoilState(selectedMonthState);
  const expensesByCategory = useRecoilValue(expensesByCategorySelector);

  const selectedDateString = useMemo(
    () => selectedMonth.format('YYYY/MM'),
    [selectedMonth],
  );

  const next = () => {
    setSelectedMonth(selectedMonth.add(1, 'month'));
  };

  const prev = () => {
    setSelectedMonth(selectedMonth.subtract(1, 'month'));
  };

  return (
    <View style={styles.container}>
      <RecordHeader dateString={selectedDateString} next={next} prev={prev} />
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
