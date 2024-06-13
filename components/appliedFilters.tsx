import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from '@/context/appContext';
import { theme } from '@/constants/theme';

const AppliedFiltersList: React.FC = () => {
  const { state, removeFilter, setPage } = useContext(AppContext);
  const appliedFiltersArray = (state.appliedFilters || []).flatMap(appliedFilter => appliedFilter.filterOptions);

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.appliedFilterContainer}>
      <Text style={styles.filterLabel}>{item}</Text>
      <TouchableOpacity onPress={() => handleFilterClear(item)} style={styles.closeIconContainer}>
        <AntDesign name="closecircle" size={20} color={theme.colors.gray} />
      </TouchableOpacity>
    </View>
  );

  const handleFilterClear = (filter: string) => {
      removeFilter(filter);
      setPage(1);
  };

  return (
    <View style={styles.container}>
      {appliedFiltersArray.length > 0 && (
        <FlatList
          horizontal
          data={appliedFiltersArray}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const keyExtractor = (item: string, index: number) => `${item}-${index}`;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    position: "relative"
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  appliedFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.pink,
    borderStyle: 'dashed',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },
  filterLabel: {
    color: theme.colors.pink,
    fontWeight: '400',
    marginRight: 10,
  },
  closeIconContainer: {
    marginLeft: 'auto',
    position: "absolute",
    top: -15,
    left: -10
  },
});

export default AppliedFiltersList;
