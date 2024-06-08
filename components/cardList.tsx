import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CardList() {
  return (
    <View>
     <Text style={{ color: "#7d8080", marginLeft: 10, marginBottom: 10 }}>Categories</Text>
     <ScrollView horizontal scrollEnabled>
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
