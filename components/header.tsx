import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '@/constants/theme';
import { ChangeEvent, useContext } from 'react';
import { AppContext } from '@/context/appContext';

export default function Header() {
  const { fetchPosts, updateQueryString } = useContext(AppContext);

  const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    updateQueryString(e.nativeEvent.text)
    fetchPosts();
  }
  
  return (
      <View style={{ marginHorizontal: 5 }}>
        <View style={styles.searchBarContainer}>
          <Feather name="search" size={24} color="#7d8080" />
          <TextInput style={styles.searchBarInput} placeholder='Search...' onChange={handleSearch}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
     display: "flex",
     flexDirection: "row",
     alignItems: "center",
     width: "100%",
     height: 50,
     backgroundColor: theme.colors.white,
     marginVertical:20,
     padding: 10,
     borderRadius: 20,
  },
  searchBarInput: {
      color: theme.colors.black,
      marginLeft: 10,
  }
});
