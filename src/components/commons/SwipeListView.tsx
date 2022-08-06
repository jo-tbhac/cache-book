import React, { ReactNode } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SWIPE_LIST_BUTTON_WIDTH, SWIPE_LIST_BUTTON_OFFSET } from '@styles/index';
import { colors } from '@styles/color';

interface SwipeListViewProps {
  children: ReactNode;
  onPressDelete: () => void;
}

const SwipeListView = (props: SwipeListViewProps) => {
  const { children, onPressDelete } = props;

  const windowWidth = useWindowDimensions().width;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ width: windowWidth + SWIPE_LIST_BUTTON_WIDTH }}
      snapToOffsets={[windowWidth]}
    >
      {children}
      <TouchableOpacity style={styles.deleteButtonWrapper} onPress={onPressDelete}>
        <View style={styles.deleteButton}>
          <FontAwesome5 name="trash-alt" size={16} style={styles.deleteButtonIcon} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  deleteButtonWrapper: {
    backgroundColor: colors.deleteButton.background,
    paddingRight: SWIPE_LIST_BUTTON_OFFSET,
  },
  deleteButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: SWIPE_LIST_BUTTON_WIDTH,
  },
  deleteButtonIcon: {
    color: colors.deleteButton.label,
  },
});

export default SwipeListView;
