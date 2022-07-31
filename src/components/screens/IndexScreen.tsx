import React, { useMemo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import RecordHeader from '@components/records/Header';
import RecordListItem from '@components/records/ListItem';
import { selectedMonthState } from '@store/date/atom';
import { monthlyRecordsLoader } from '@store/records/selector';
import { RecordTypes } from '@store/records/types';
import { colors } from '@styles/color';

const IndexScreen = () => {
  const selectedMonth = useRecoilValue(selectedMonthState);
  const records = useRecoilValue(monthlyRecordsLoader);

  const selectedDateString = useMemo(
    () => dayjs(selectedMonth).format('YYYY/MM'),
    [selectedMonth],
  );

  const totalExpenses = (index: number, method: string) => {
    let total = 0;
    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];
      if (record.type === RecordTypes.expenses && record.method === method) {
        total += record.value;
      }
      if (i === index) {
        return total;
      }
    }

    return total;
  };

  return (
    <View style={styles.container}>
      <RecordHeader dateString={selectedDateString} />
      <FlatList
        data={records}
        renderItem={({ item, index }) => {
          const dateString = dayjs(item.date).format('MM/DD');
          const previousRecord = records[index - 1];
          const previousDateString = previousRecord ? dayjs(previousRecord.date).format('MM/DD') : '';

          return (
            <RecordListItem
              dateString={dateString}
              previousDateString={previousDateString}
              name={item.name}
              value={item.value}
              type={item.type}
              method={item.method}
              totalExpenses={totalExpenses(index, item.method)}
            />
          );
        }}
        style={styles.recordList}
        contentContainerStyle={styles.recordListContainer}
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
  recordList: {
    flex: 1,
    width: '100%',
  },
  recordListContainer: {
    paddingHorizontal: 5,
  },
});

export default IndexScreen;
