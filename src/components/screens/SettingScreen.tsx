import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SETTING_LIST } from '@components/types';
import SettingListItem from '@components/settings/ListItem';
import { colors } from '@styles/color';
import { BASE_PADDING } from '@styles/index';

const SettingScreen = () => (
  <View style={styles.container}>
    <FlatList
      data={SETTING_LIST}
      renderItem={({ item }) => (
        <SettingListItem label={item.label} icon={item.icon} screen={item.screen} />
      )}
      keyExtractor={(item) => item.label}
      style={styles.listContainer}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.screen.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: BASE_PADDING,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
});

export default SettingScreen;
