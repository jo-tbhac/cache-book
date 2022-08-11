import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet, Modal, Pressable, View,
} from 'react-native';
import RecordForm from '@components/records/Form';
import { getRecord, updateRecord } from '@db/records/query';
import { useUpdateRecord } from '@store/records/hooks';
import { IORecord, RecordType } from '@store/records/types';
import { colors } from '@styles/color';

interface FormModalProps {
  visible: boolean;
  recordId: number;
  close: () => void;
  onBackDropPress?: () => void;
}

const FormModal = (props: FormModalProps) => {
  const {
    visible,
    recordId,
    close,
    onBackDropPress,
  } = props;

  const setUpdateRecords = useUpdateRecord();

  const [record, setRecord] = useState<IORecord | null>(null);

  useEffect(() => {
    getRecord(recordId)
      .then((fetchedRecord) => {
        setRecord(fetchedRecord);
      })
      .catch(() => {
        // TODO handle error
      });
  }, [recordId]);

  const saveRecord = useCallback((params: {
    name: string;
    value: number;
    type: RecordType;
    category: { id: number; name: string } | null;
    method: { id: number; name: string };
  }) => {
    if (!record) {
      return;
    }

    updateRecord(
      record.id,
      {
        name: params.name,
        value: params.value,
        type: params.type,
        date: record.date,
        categoryId: params.category ? params.category.id : null,
        methodId: params.method.id,
      },
    )
      .then((updatedItem) => {
        setUpdateRecords(updatedItem);
        close();
      })
      .catch(() => {
        // TODO handle error
      });
  }, [close, record, setUpdateRecords]);

  if (!record) {
    return null;
  }

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <Pressable style={styles.overlay} onPress={onBackDropPress}>
        <View style={styles.formContainer}>
          <RecordForm
            isEdit
            defaultValues={{
              name: record.name,
              value: record.value,
              type: record.type,
              categoryId: record.categoryId,
              methodId: record.methodId,
            }}
            saveRecord={saveRecord}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: colors.modal.overlay,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  formContainer: {
    backgroundColor: colors.modal.background,
    borderRadius: 3,
    maxWidth: 600,
    paddingTop: 20,
    width: '95%',
  },
});

export default FormModal;
