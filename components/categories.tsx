import React, { useContext, useCallback, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from '@/context/appContext';
import categories from '@/constants/categories';
import { theme } from '@/constants/theme';

const CategoriesList: React.FC = () => {
  const { state, setSelectedCategory, setPage } = useContext(AppContext);

  const handleCategoryToggle = useCallback(
    (category: string) => {
      if (state.selectedCategory === category) {
        setSelectedCategory('');
      } else {
        setSelectedCategory(category);
      }
      setPage(1);
    },
    [state.selectedCategory, setSelectedCategory, setPage]
  );

  const categoryButtons = useMemo(() => {
    return categories.map((category) => (
      <TouchableOpacity
        style={styles.categories}
        onPress={() => handleCategoryToggle(category)}
        key={category}
      >
        <Text style={styles.categoryText}>{category}</Text>
        {state.selectedCategory === category && (
          <AntDesign name="check" size={15} color={theme.colors.white} />
        )}
      </TouchableOpacity>
    ));
  }, [categories, handleCategoryToggle, state.selectedCategory]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal scrollEnabled>
        {categoryButtons}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  categories: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    backgroundColor: theme.colors.pink,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    color: theme.colors.white,
    fontWeight: '500',
    marginRight: 5,
  },
});

export default CategoriesList;
