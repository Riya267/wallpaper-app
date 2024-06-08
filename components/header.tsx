import { StyleSheet, TextInput, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Feather name="search" size={24} color="#7d8080" />
        <TextInput style={styles.searchBarInput} placeholder='Search...' placeholderTextColor={"#7d8080"}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  searchBarContainer: {
     display: "flex",
     flexDirection: "row",
     alignItems: "center",
     width: "100%",
     height: 50,
     borderWidth: 2,
     backgroundColor: "#2a2b2b",
     color: "#7d8080",
     marginVertical:20,
     padding: 10,
     borderRadius: 20,
  },
  searchBarInput: {
      color: "#ffffff",
      marginLeft: 10,
  }
});
