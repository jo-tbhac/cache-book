import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BASE_PADDING } from '@styles/index';

interface RecordHeaderProps {
  dateString: string;
}

const RecordHeader = (props: RecordHeaderProps) => {
  const { dateString } = props;

  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {dateString}
        の記録
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 30,
    paddingHorizontal: BASE_PADDING,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default RecordHeader;
