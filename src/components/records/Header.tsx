import React, { useMemo } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import { useRecoilState } from 'recoil';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { selectedDateState, selectedMonthState } from '@store/date/atom';
import { BASE_PADDING } from '@styles/index';

interface RecordHeaderProps {
  type: 'day' | 'month';
}

const RecordHeader = (props: RecordHeaderProps) => {
  const { type } = props;

  const [
    selectedDate,
    setSelectedDate,
  ] = useRecoilState(type === 'day' ? selectedDateState : selectedMonthState);

  const dateString = useMemo(
    () => selectedDate.format(type === 'day' ? 'YYYY/MM/DD' : 'YYYY/MM'),
    [selectedDate, type],
  );

  const next = () => {
    setSelectedDate(selectedDate.add(1, type));
  };

  const prev = () => {
    setSelectedDate(selectedDate.subtract(1, type));
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.angleButton} onPress={next}>
        <FontAwesome5 name="angle-left" size={20} />
      </TouchableOpacity>
      <Text style={styles.title}>
        {dateString}
        の記録
      </Text>
      <TouchableOpacity style={styles.angleButton} onPress={prev}>
        <FontAwesome5 name="angle-right" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: BASE_PADDING,
    width: '100%',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  angleButton: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});

export default RecordHeader;
