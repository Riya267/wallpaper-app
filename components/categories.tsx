import categories from '@/constants/categories';
import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { AntDesign } from '@expo/vector-icons';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CategoriesList: React.FC = ()  => {
  const { state, setSelectedCategory, setPage } = useContext(AppContext);

  const handleCategoryToggle = (category: string) => {
    if(state.selectedCategory === category) setSelectedCategory("");
    else {
      setSelectedCategory(category)
      setPage(1)
    }
  }
  
  return (
      <View style={{ marginBottom: 20 }}>
        <ScrollView horizontal scrollEnabled>
           {
              categories.map((category) => {
                return <TouchableOpacity style={styles.categories} 
                onPress={() => handleCategoryToggle(category)} key={category}>
                          <Text style={{ color: theme.colors.white, fontWeight: "500", marginRight: 5 }}>{category}</Text>
                          {state.selectedCategory === category &&<AntDesign name="check" size={15} color={theme.colors.white} />}
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
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
  },
});

export default CategoriesList;