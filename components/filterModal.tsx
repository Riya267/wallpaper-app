import { AppContext } from '@/context/appContext';
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import filterOptions from '@/constants/filters';

export interface FilterOptionsInterface {
  filterLabel: string;
  filterOptions: string[];
  mappingKey: string;
}

const FilterModal: React.FC = () => {
  const { state, toggleFilterModalVisibility, setPage, setAppliedFilters } =
    useContext(AppContext);
  const [selectedFilters, setSelectedFilters] = useState<
    Array<FilterOptionsInterface>
  >(state.appliedFilters || []);

  const onClose = () => {
    toggleFilterModalVisibility(false);
  };

  const handleSelectFilter = (filterKey: string, option: string) => {
    setSelectedFilters((prevFilters) => {
      const index = prevFilters.findIndex(
        (filter) => filter.mappingKey === filterKey
      );
      const filter = prevFilters[index];
      const prevSelectedOptions = filter ? filter.filterOptions : [];
      const isSelected = prevSelectedOptions.includes(option);
      const newSelectedOptions = isSelected
        ? prevSelectedOptions.filter((item) => item !== option)
        : [...prevSelectedOptions, option];

      const updatedFilters = [...prevFilters];
      if (filter) {
        updatedFilters[index] = {
          ...filter,
          filterOptions: newSelectedOptions,
        };
      } else {
        updatedFilters.push({
          filterLabel:
            filterOptions.find((f) => f.mappingKey === filterKey)
              ?.filterLabel || '',
          filterOptions: newSelectedOptions,
          mappingKey: filterKey,
        });
      }
      return updatedFilters;
    });
  };

  useEffect(() => {
    setSelectedFilters(state.appliedFilters || []);
  }, [state.appliedFilters]);

  const isSelected = (filterKey: string, option: string) => {
    const filter = selectedFilters.find(
      (filter) => filter.mappingKey === filterKey
    );
    return filter ? filter.filterOptions.includes(option) : false;
  };

  const handleFetchWallpaper = (type: 'clear' | 'apply') => {
    toggleFilterModalVisibility(false);
    if (type === 'clear') setAppliedFilters([]);
    else setAppliedFilters(selectedFilters);
    setPage(1);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={state.openfilterModal}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.filters}>
            {filterOptions.map((filter) => (
              <View key={filter.mappingKey} style={{ marginVertical: 10 }}>
                <Text style={styles.filterLabel}>{filter.filterLabel}</Text>
                <View style={styles.filterOptionsContainer}>
                  {filter.filterOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        {
                          borderColor:
                            filter.filterLabel === 'Color'
                              ? option
                              : theme.colors.pink,
                          backgroundColor:
                            filter.filterLabel === 'Color'
                              ? option
                              : theme.colors.white,
                          ...(filter.filterLabel === 'Color' && {
                            paddingHorizontal: 10,
                            paddingVertical: 0,
                            marginRight: 15,
                            height: 40,
                            width: 40,
                          }),
                        },
                      ]}
                      onPress={() =>
                        handleSelectFilter(filter.mappingKey, option)
                      }
                    >
                      {filter.filterLabel !== 'Color' && (
                        <Text style={styles.filterOptionText}>{option}</Text>
                      )}
                      {isSelected(filter.mappingKey, option) && (
                        <AntDesign
                          name="check"
                          size={20}
                          color="purple"
                          style={{ padding: 0 }}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => handleFetchWallpaper('clear')}
              style={styles.button}
            >
              <Text
                style={{
                  color: theme.colors.background,
                  fontSize: 20,
                  fontWeight: '500',
                }}
              >
                Clear
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleFetchWallpaper('apply')}
              style={[
                styles.button,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: 20,
                  fontWeight: '500',
                }}
              >
                Apply
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filters: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 5,
    marginLeft: 5,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    flexDirection: 'row',
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 50,
    margin: 5,
    alignItems: 'center',
    height: 50,
  },
  filterOptionText: {
    color: theme.colors.pink,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export default FilterModal;
