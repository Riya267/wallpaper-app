import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"]

export default function CategoriesList() {
  const { state, fetchPosts } = useContext(AppContext);

  const handleCategoryClick = (category: string) => {
    fetchPosts({ selectedCategory: category });
  }
  
  return (
      <View style={{ marginBottom: 20 }}>
        <ScrollView horizontal scrollEnabled>
           {
              categories.map((category) => {
                return <TouchableOpacity style={styles.categories} 
                onPress={() => handleCategoryClick(category)} key={category}>
                          <Text style={{ color: theme.colors.white, fontWeight: "500" }}>{category}</Text>
                </TouchableOpacity>
              })
            }
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  categories: {
      marginLeft: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 2,
      backgroundColor: theme.colors.pink,
      borderRadius: 20,
  },
});
