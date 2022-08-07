import React from 'react';
import {
  StyleSheet, View, Text, Modal, TouchableOpacity,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { dialogState } from '@store/dialog/atom';
import { colors } from '@styles/color';

const Dialog = () => {
  const [dialogOptions, setDialogOptions] = useRecoilState(dialogState);

  if (!dialogOptions.visible) {
    return null;
  }

  const onOkPress = () => {
    if (dialogOptions.onOkPress) {
      dialogOptions.onOkPress();
    }
    setDialogOptions({ visible: false, title: '' });
  };

  const onCancelPress = () => {
    if (dialogOptions.onCancelPress) {
      dialogOptions.onCancelPress();
    }
    setDialogOptions({ visible: false, title: '' });
  };

  return (
    <Modal animationType="fade" transparent visible={dialogOptions.visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{dialogOptions.title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onCancelPress}>
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onOkPress}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: colors.dialog.overlay,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: colors.dialog.background,
    borderRadius: 3,
    maxWidth: 500,
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: '90%',
  },
  title: {
    color: colors.font.default,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  buttonText: {
    color: colors.dialog.okButton,
    fontSize: 16,
  },
  cancelButtonText: {
    color: colors.dialog.cancelButton,
    fontSize: 16,
  },
});

export default Dialog;
