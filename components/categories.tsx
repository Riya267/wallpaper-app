import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { useContext, useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';

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
                return <TouchableOpacity style={[styles.categories, 
                                              state.selectedCategory === category && styles.activeCategory]} 
                onPress={() => handleCategoryClick(category)}>
                          <Text style={[state.selectedCategory === category ? { color: theme.colors.white } : { color: "#01204E" }]}>{category}</Text>
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
      borderColor: "#01204E",
      borderRadius: 20,
  },
  activeCategory: {
    backgroundColor: "#01204E",
  }
});
