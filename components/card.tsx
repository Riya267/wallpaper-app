import { StyleSheet, Text, View } from 'react-native';

export default function Card() {
  return (
    <View>
     <Text>Card</Text>
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
