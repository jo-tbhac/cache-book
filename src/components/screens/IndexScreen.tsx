import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import Border from '@components/commons/Border';
import RecordHeader from '@components/records/Header';
import RecordListItem from '@components/records/ListItem';
import { useDeleteRecord } from '@store/records/hooks';
import { monthlyRecordsSelector } from '@store/records/selector';
import { RecordTypes } from '@store/records/types';
import { colors } from '@styles/color';
import { RECORD_LIST_PADDING } from '@styles/index';

const IndexScreen = () => {
  const records = useRecoilValue(monthlyRecordsSelector);

  const deleteRecord = useDeleteRecord();

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

  const onDelete = useCallback((recordId: number) => {
    deleteRecord(recordId);
  }, [deleteRecord]);

  return (
    <View style={styles.container}>
      <RecordHeader type="month" />
      <FlatList
        data={records}
        renderItem={({ item, index }) => {
          const dateString = dayjs(item.date).format('MM/DD');
          const previousRecord = records[index - 1];
          const previousDateString = previousRecord ? dayjs(previousRecord.date).format('MM/DD') : '';

          return (
            <RecordListItem
              id={item.id}
              dateString={dateString}
              previousDateString={previousDateString}
              name={item.name}
              value={item.value}
              type={item.type}
              method={item.method}
              totalExpenses={totalExpenses(index, item.method)}
              onDeleteRecord={onDelete}
            />
          );
        }}
        ItemSeparatorComponent={Border}
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
    paddingLeft: RECORD_LIST_PADDING,
  },
});

export default IndexScreen;
