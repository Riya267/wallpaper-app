import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '@/constants/Theme';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const Header: React.FC = () => {
  const router = useRouter();
  const { setQueryString, toggleFilterModalVisibility, setPage } =
    useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleFilterClick = () => {
    toggleFilterModalVisibility(true);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setQueryString(searchTerm);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchBarContainer}>
        <View
          style={{
            width: '80%',
            paddingVertical: 15,
            paddingRight: 10,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Feather name="search" size={27} color={theme.colors.background} />
          <TextInput
            style={styles.searchBarInput}
            placeholder="Search Wallpapers..."
            placeholderTextColor={theme.colors.background}
            onChange={(e) => handleSearch(e.nativeEvent.text)}
            value={searchTerm}
          />
        </View>
        {searchTerm && (
          <TouchableOpacity
            onPress={() => handleSearch('')}
            style={{ padding: 15 }}
          >
            <Ionicons name="close" size={27} color={theme.colors.background} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={handleFilterClick} style={{ padding: 10 }}>
        <Feather name="filter" size={30} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: 60,
    backgroundColor: theme.colors.white,
    marginVertical: 20,
    borderRadius: 30,
    paddingLeft: 15,
  },
  searchBarInput: {
    color: theme.colors.black,
    marginLeft: 10,
    fontSize: 20,
  },
});

export default Header;
