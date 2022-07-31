import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { colors } from '@styles/color';

interface MethodListItemProps {
  id: number | null;
  name: string;
  saveMethod: (params: { id: number | null; name: string }) => void;
}

const MethodListItem = (props: MethodListItemProps) => {
  const {
    id,
    name,
    saveMethod,
  } = props;

  const [nameState, setNameState] = useState(name);

  const onChangeName = (value: string) => {
    setNameState(value);
  };

  const onEndEditing = () => {
    if (name === nameState) {
      return;
    }
    saveMethod({ id, name: nameState });

    if (!id) {
      setNameState('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={nameState}
        onChangeText={onChangeName}
        onEndEditing={onEndEditing}
        selectionColor={colors.textInput.caret}
        placeholderTextColor={colors.placeholder.default}
        placeholder="＋支払い方法"
        returnKeyType="done"
        style={styles.textInput}
      />
      {id && (
      <View style={styles.dragIconContainer}>
        <FontAwesome5 name="grip-lines" size={16} style={styles.dragIcon} />
      </View>
      )}
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
    paddingHorizontal: 3,
    paddingVertical: 15,
  },
  textInput: {
    color: colors.font.default,
    flex: 1,
    fontSize: 18,
  },
  dragIconContainer: {
    paddingHorizontal: 5,
  },
  dragIcon: {
    color: colors.list.angleIconFill,
  },
});

export default React.memo(MethodListItem);
