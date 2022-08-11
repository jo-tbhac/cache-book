import dayjs from 'dayjs';
import { getRecordsBy } from '@db/records/query';

export const dailyRecordsLoader = async (selectedDate: dayjs.Dayjs) => {
  const from = selectedDate.startOf('day').toDate();
  const to = selectedDate.endOf('day').toDate();

  const records = await getRecordsBy({ from, to }).catch((error) => {
    throw error;
  });

  return records;
};

export const monthlyRecordsLoader = async (selectedMonth: dayjs.Dayjs) => {
  const from = selectedMonth.startOf('month').toDate();
  const to = selectedMonth.endOf('month').toDate();

  const records = await getRecordsBy({ from, to }).catch((error) => {
    throw error;
  });

  return records;
};
