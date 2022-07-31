import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { SettingList } from '@components/types';
import { SettingScreenNavigationProp } from '@navigators/types';
import { colors } from '@styles/color';
import { ACTIVE_OPACITY, LIST_ICON_SIZE } from '@styles/index';

interface SettingListItemProps extends SettingList {}

const SettingListItem = (props: SettingListItemProps) => {
  const { label, icon, screen } = props;

  const navigation = useNavigation<SettingScreenNavigationProp>();

  const onPress = () => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={ACTIVE_OPACITY}>
      <View style={styles.container}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.label}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <FontAwesome5 name="angle-right" size={LIST_ICON_SIZE} style={styles.angleIcon} />
      </View>
    </TouchableOpacity>
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
