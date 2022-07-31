import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useRecoilState } from 'recoil';
import { insertMethod, updateMethod } from '@db/methods/query';
import MethodListItem from '@components/methods/ListItem';
import { methodsState } from '@store/methods/atom';
import { colors } from '@styles/color';
import { BASE_PADDING } from '@styles/index';

const MethodScreen = () => {
  const [methods, setMethods] = useRecoilState(methodsState);

  const saveMethod = useCallback(({ id, name }: { id: number | null; name: string }) => {
    if (id) {
      updateMethod(id, { name })
        .then(() => {
          setMethods(
            (currentMethods) => currentMethods.map(
              (method) => (method.id === id ? { ...method, name } : method),
            ),
          );
        })
        .catch(() => {
          // TODO handle error
        });

      return;
    }

    insertMethod({ name })
      .then((insertedItem) => {
        setMethods((currentMethods) => [...currentMethods, insertedItem]);
      })
      .catch(() => {
        // TODO handle error
      });
  }, [setMethods]);

  return (
    <FlatList
      data={methods}
      renderItem={({ item }) => (
        <MethodListItem
          id={item.id}
          name={item.name}
          saveMethod={saveMethod}
        />
      )}
      ListFooterComponent={(
        <MethodListItem id={null} name="" saveMethod={saveMethod} />
      )}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screen.background,
    paddingHorizontal: BASE_PADDING,
  },
});

export default MethodScreen;
