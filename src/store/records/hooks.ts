import { useCallback } from 'react';
import dayjs from 'dayjs';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { selectedDateState, selectedMonthState } from '@store/date/atom';
import { dailyRecordsState, monthlyRecordsState } from '@store/records/atom';
import { IORecord } from '@store/records/types';

export const useAddRecord = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedMonth = useRecoilValue(selectedMonthState);
  const setDailyRecords = useSetRecoilState(dailyRecordsState(selectedDate));
  const setMonthlyRecords = useSetRecoilState(monthlyRecordsState(selectedMonth));

  const addRecord = useCallback((newRecord: IORecord) => {
    const recordDate = dayjs(newRecord.date);
    if (recordDate.isSame(selectedDate, 'date')) {
      setDailyRecords((currentRecords) => [...currentRecords, newRecord]);
    }
    if (recordDate.isSame(selectedMonth, 'month')) {
      setMonthlyRecords((currentRecords) => [...currentRecords, newRecord].sort(
        (a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }

          return 0;
        },
      ));
    }
  }, [selectedDate, selectedMonth, setDailyRecords, setMonthlyRecords]);

  return addRecord;
};

export const useUpdateRecord = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedMonth = useRecoilValue(selectedMonthState);
  const setDailyRecords = useSetRecoilState(dailyRecordsState(selectedDate));
  const setMonthlyRecords = useSetRecoilState(monthlyRecordsState(selectedMonth));

  const updateRecord = useCallback((newRecord: IORecord) => {
    setDailyRecords((currentRecords) => currentRecords.map(
      (currentRecord) => (currentRecord.id === newRecord.id ? newRecord : currentRecord),
    ));
    setMonthlyRecords((currentRecords) => currentRecords.map(
      (currentRecord) => (currentRecord.id === newRecord.id ? newRecord : currentRecord),
    ));
  }, [setDailyRecords, setMonthlyRecords]);

  return updateRecord;
};

export const useDeleteRecord = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedMonth = useRecoilValue(selectedMonthState);
  const setDailyRecords = useSetRecoilState(dailyRecordsState(selectedDate));
  const setMonthlyRecords = useSetRecoilState(monthlyRecordsState(selectedMonth));

  const deleteRecord = useCallback((recordId: number) => {
    setDailyRecords((currentRecords) => currentRecords.filter(
      (currentRecord) => (currentRecord.id !== recordId),
    ));
    setMonthlyRecords((currentRecords) => currentRecords.filter(
      (currentRecord) => (currentRecord.id !== recordId),
    ));
  }, [setDailyRecords, setMonthlyRecords]);

  return deleteRecord;
};
