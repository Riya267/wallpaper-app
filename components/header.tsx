import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '@/constants/theme';
import { useContext } from 'react';
import { AppContext } from '@/context/appContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const { fetchPosts } = useContext(AppContext);

  const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    fetchPosts({ queryString: e.nativeEvent.text });
  }
  
  return (
      <View style={{ marginTop: 5, marginBottom: 10, paddingHorizontal: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <View style={styles.searchBarContainer}>
          <Feather name="search" size={27} color={theme.colors.background} />
          <TextInput style={styles.searchBarInput} placeholder='Search Wallpapers...' placeholderTextColor={theme.colors.background} onChange={handleSearch}/>
        </View>
        <TouchableOpacity>
        <Ionicons name="filter-sharp" size={30} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
     display: "flex",
     flexDirection: "row",
     alignItems: "center",
     width: "85%",
     height: 60,
     backgroundColor: theme.colors.white,
     marginVertical:20,
     padding: 15,
     borderRadius: 30,
  },
  searchBarInput: {
      color: theme.colors.black,
      marginLeft: 10,
      fontSize: 20
  }
});
