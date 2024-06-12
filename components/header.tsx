import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '@/constants/theme';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/appContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header: React.FC = () => {
  const { setQueryString, toggleFilterModalVisibility, setPage } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  }
  
  const handleFilterClick = () => {
    toggleFilterModalVisibility(true);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setQueryString(debouncedSearchTerm);
    setPage(1);
  }, [debouncedSearchTerm]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchBarContainer}>
        <View style={{ width: "80%", paddingVertical: 15, paddingRight:10, display: "flex", flexDirection: "row" }}>
          <Feather name="search" size={27} color={theme.colors.background} />
          <TextInput 
            style={styles.searchBarInput} 
            placeholder='Search Wallpapers...' 
            placeholderTextColor={theme.colors.background}
            onChange={(e) => handleSearch(e.nativeEvent.text)} 
            value={searchTerm}
          />
        </View>
        {
          searchTerm &&
          <TouchableOpacity onPress={() => handleSearch("")} style={{ padding: 15 }}>
            <Ionicons name='close' size={27} color={theme.colors.background}/>
          </TouchableOpacity>
        }
      </View>
        <TouchableOpacity onPress={handleFilterClick} style={{ padding: 10 }}>
          <Ionicons name="filter-sharp" size={30} color={theme.colors.white} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 5, 
    marginBottom: 10, 
    paddingHorizontal: 5, 
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between"
  },
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    height: 60,
    backgroundColor: theme.colors.white,
    marginVertical: 20,
    borderRadius: 30,
    paddingLeft: 10
  },
  searchBarInput: {
    color: theme.colors.black,
    marginLeft: 10,
    fontSize: 20
  }
});

export default Header;
