import React, { useMemo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import ExpensesListItem from '@components/records/ExpensesListItem';
import RecordHeader from '@components/records/Header';
import { selectedMonthState } from '@store/date/atom';
import { monthlyRecordsState } from '@store/records/atom';
import { ExpensesByCategory } from '@store/records/types';
import { colors } from '@styles/color';

const IndexByCategoryScreen = () => {
  const [selectedMonth, setSelectedMonth] = useRecoilState(selectedMonthState);

  const records = useRecoilValue(monthlyRecordsState);

  const selectedDateString = useMemo(
    () => selectedMonth.format('YYYY/MM'),
    [selectedMonth],
  );

  const expensesByCategory = useMemo(() => {
    const expensesMap: ExpensesByCategory = {};

    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];
      if (record.category) {
        const currentValue = expensesMap[record.category] || 0;
        expensesMap[record.category] = currentValue + record.value;
      }
    }

    return Object.keys(expensesMap).map((name) => ({ name, value: expensesMap[name] }));
  }, [records]);

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
