import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useRecoilState } from 'recoil';
import { insertCategory, updateCategory } from '@db/categories/query';
import CategoryListItem from '@components/categories/ListItem';
import { categoriesState } from '@store/categories/atom';
import { colors } from '@styles/color';
import { BASE_PADDING } from '@styles/index';

const CategoryScreen = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);

  const saveCategory = useCallback(({ id, name }: { id: number | null; name: string }) => {
    if (id) {
      updateCategory(id, { name })
        .then(() => {
          setCategories(
            (currentCategories) => currentCategories.map(
              (category) => (category.id === id ? { ...category, name } : category),
            ),
          );
        })
        .catch(() => {
          // TODO handle error
        });

      return;
    }

    insertCategory({ name })
      .then((insertedItem) => {
        setCategories((currentCategories) => [...currentCategories, insertedItem]);
      })
      .catch(() => {
        // TODO handle error
      });
  }, [setCategories]);

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <CategoryListItem
          id={item.id}
          name={item.name}
          saveCategory={saveCategory}
        />
      )}
      ListFooterComponent={(
        <CategoryListItem id={null} name="" saveCategory={saveCategory} />
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

export default CategoryScreen;
