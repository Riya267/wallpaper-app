import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const categories = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"]

export default function CategoriesList() {
  return (
    <View>
     <Text style={{ color: "#7d8080", marginLeft: 10, marginBottom: 10 }}>Categories</Text>
     <ScrollView horizontal scrollEnabled>
        {
            categories.map((category) => {
            return <TouchableOpacity>
                     <Text style={styles.categories}>{category}</Text>
                </TouchableOpacity>
            })
        }
     </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categories: {
      color: "#ffffff",
      marginLeft: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 2,
      backgroundColor: "#700428",
      borderRadius: 20,
      borderColor: "#696466",
  }
});
