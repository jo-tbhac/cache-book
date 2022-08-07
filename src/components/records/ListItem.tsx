import React, { useRef } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, useWindowDimensions, ScrollView,
} from 'react-native';
import { useSetRecoilState } from 'recoil';
import SwipeListView from '@components/commons/SwipeListView';
import { deleteRecord } from '@db/records/query';
import { dialogState } from '@store/dialog/atom';
import { RecordType, RecordTypes } from '@store/records/types';
import { colors } from '@styles/color';
import { ACTIVE_OPACITY, RECORD_LIST_PADDING } from '@styles/index';

interface RecordListItemProps {
  id: number;
  dateString?: string;
  previousDateString?: string;
  name: string;
  value: number;
  type: RecordType;
  category?: string;
  method: string;
  totalExpenses?: number;
  onPress?: (recordId: number) => void;
  onDeleteRecord: (recordId: number) => void;
}

const RecordListItem = (props: RecordListItemProps) => {
  const {
    id,
    dateString,
    previousDateString,
    name,
    value,
    type,
    method,
    category,
    totalExpenses,
    onPress,
    onDeleteRecord,
  } = props;

  const setDialogState = useSetRecoilState(dialogState);

  const deviceWidth = useWindowDimensions().width;

  const swipeListViewRef = useRef<ScrollView>(null);

  const fontColor = {
    color: type === RecordTypes.incomes ? colors.font.default : colors.font.alert,
  };

  const dateVisible = dateString && dateString === previousDateString;
  const showDate = dateString !== undefined;
  const showCategory = category !== undefined;
  const showTotalExpenses = totalExpenses !== undefined;

  const onPressDelete = () => {
    const onOkPress = () => {
      deleteRecord(id)
        .then(() => {
          onDeleteRecord(id);
        })
        .catch(() => {
          // TODO handle error
        });
    };

    const onCancelPress = () => {
      swipeListViewRef.current?.scrollTo({ x: 0, animated: true });
    };
    setDialogState({
      visible: true,
      title: '削除しますか？',
      onCancelPress,
      onOkPress,
    });
  };

  return (
    <SwipeListView ref={swipeListViewRef} onPressDelete={onPressDelete}>
      <TouchableOpacity
        onPress={() => onPress && onPress(id)}
        activeOpacity={onPress ? ACTIVE_OPACITY : 1}
      >
        <View style={[styles.container, { width: deviceWidth - RECORD_LIST_PADDING }]}>
          {showDate && (
            <View style={styles.date}>
              <Text style={[styles.dateText, dateVisible ? { color: 'transparent' } : undefined]}>
                {dateString}
              </Text>
            </View>
          )}
          <View style={styles.name}>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={styles.value}>
            <Text style={[styles.valueText, fontColor]}>{value.toLocaleString('ja-jp')}</Text>
          </View>
          <View style={styles.method}>
            <Text style={styles.methodText}>{method}</Text>
          </View>
          {showTotalExpenses && totalExpenses && (
            <View style={styles.totalExpenses}>
              <Text style={[styles.totalExpensesText, fontColor]}>
                {totalExpenses.toLocaleString('ja-jp')}
              </Text>
            </View>
          )}
          {showCategory && (
            <View style={styles.category}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </SwipeListView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.list.background,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  date: {
    paddingHorizontal: 3,
  },
  dateText: {
    fontSize: 14,
    color: colors.font.default,
  },
  name: {
    flex: 2,
    paddingHorizontal: 3,
  },
  nameText: {
    color: colors.font.default,
    fontSize: 14,
  },
  value: {
    flex: 1,
    paddingHorizontal: 3,
  },
  valueText: {
    fontSize: 14,
    textAlign: 'right',
  },
  category: {
    paddingHorizontal: 3,
    width: 80,
  },
  categoryText: {
    color: colors.font.default,
    fontSize: 14,
  },
  method: {
    flex: 1,
    paddingHorizontal: 3,
  },
  methodText: {
    color: colors.font.default,
    fontSize: 14,
  },
  totalExpenses: {
    paddingHorizontal: 3,
    width: 80,
  },
  totalExpensesText: {
    fontSize: 14,
    textAlign: 'right',
  },
});

export default RecordListItem;
