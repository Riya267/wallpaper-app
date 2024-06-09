import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"]

export default function CategoriesList() {
  return (
      <View style={{ marginBottom: 20 }}>
        <ScrollView horizontal scrollEnabled>
           {
              categories.map((category) => {
                return <TouchableOpacity style={styles.categories}>
                          <Text style={{ color: theme.colors.white }}>{category}</Text>
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
      backgroundColor: "#01204E",
      borderRadius: 20,
  }
});
