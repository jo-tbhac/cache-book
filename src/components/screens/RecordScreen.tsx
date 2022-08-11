import React, { useMemo, useCallback, useState } from 'react';
import {
  StyleSheet, Text, View, FlatList,
} from 'react-native';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { insertRecord } from '@db/records/query';
import Border from '@components/commons/Border';
import RecordForm from '@components/records/Form';
import RecordFormModal from '@components/records/FormModal';
import RecordHeader from '@components/records/Header';
import RecordListItem from '@components/records/ListItem';
import { selectedDateState } from '@store/date/atom';
import { useAddRecord, useDeleteRecord } from '@store/records/hooks';
import { dailyRecordsSelector } from '@store/records/selector';
import { RecordTypes, RecordType } from '@store/records/types';
import { colors } from '@styles/color';
import { BASE_PADDING, RECORD_LIST_PADDING } from '@styles/index';

const RecordScreen = () => {
  const records = useRecoilValue(dailyRecordsSelector);

  const setNewRecord = useAddRecord();
  const deleteRecord = useDeleteRecord();

  const [editRecordId, setEditRecordId] = useState<number | null>(null);

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

  const addRecord = useRecoilCallback(({ snapshot }) => async (params: {
    name: string;
    value: number;
    type: RecordType;
    category: { id: number; name: string } | null;
    method: { id: number; name: string };
  }) => {
    const selectedDate = await snapshot.getPromise(selectedDateState);
    insertRecord({
      name: params.name,
      value: params.value,
      type: params.type,
      date: selectedDate.toISOString(),
      categoryId: params.category ? params.category.id : null,
      methodId: params.method.id,
    })
      .then((insertItem) => {
        setNewRecord(insertItem);
      })
      .catch(() => {
        // TODO handle error
      });
  }, [setNewRecord]);

  const onPressList = useCallback((recordId: number) => {
    setEditRecordId(recordId);
  }, []);

  const onDelete = useCallback((recordId: number) => {
    deleteRecord(recordId);
  }, [deleteRecord]);

  const closeModal = useCallback(() => {
    setEditRecordId(null);
  }, []);

  const onModalBackDropPress = () => {
    setEditRecordId(null);
  };

  return (
    <>
      <View style={styles.container}>
        <RecordHeader type="day" />
        <RecordForm saveRecord={addRecord} />
        <FlatList
          data={records}
          renderItem={({ item }) => (
            <RecordListItem
              id={item.id}
              name={item.name}
              value={item.value}
              type={item.type}
              method={item.method}
              category={item.category}
              onPress={onPressList}
              onDeleteRecord={onDelete}
            />
          )}
          ItemSeparatorComponent={Border}
          style={styles.recordList}
          contentContainerStyle={styles.recordListContainer}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>支出合計</Text>
          <Text style={styles.totalValue}>{totalExpenses.toLocaleString('ja-jp')}</Text>
        </View>
      </View>
      {editRecordId && (
        <RecordFormModal
          visible={editRecordId !== null}
          recordId={editRecordId}
          close={closeModal}
          onBackDropPress={onModalBackDropPress}
        />
      )}
    </>
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
