import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SettingList } from '@components/types';
import { colors } from '@styles/color';

interface SettingListItemProps extends SettingList {}

const SettingListItem = (props: SettingListItemProps) => {
  const { label, icon } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <FontAwesome5 name="angle-right" size={20} style={styles.angleIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.list.background,
    borderBottomColor: colors.list.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  icon: {
    color: colors.list.iconFill,
  },
  label: {
    flex: 1,
    paddingHorizontal: 5,
  },
  labelText: {
    color: colors.font.default,
    fontSize: 18,
  },
  angleIcon: {
    color: colors.list.angleIconFill,
  },
});
export default SettingListItem;
