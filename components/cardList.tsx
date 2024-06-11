import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppContext, WallpaperInterface } from '@/context/appContext';
import { MasonryFlashList } from "@shopify/flash-list";
import Card from './card';
import { getColumns } from '@/util/helper';

const CardList: React.FC = ()  => {
  const { state, fetchWallpapers } = useContext(AppContext);

  useEffect(() => {
    fetchWallpapers({
      queryString: state.queryString,
      selectedCategory: state.selectedCategory,
      appliedFilters: state.appliedFilters,
    });
  }, [state.queryString, state.selectedCategory, state.appliedFilters]);

  const columns = getColumns();
  return (
      <View style={styles.container}>
        <MasonryFlashList
          numColumns={columns}
          data={state.wallpapers}
          renderItem={({ item, index }: { item: WallpaperInterface, index: number }) => (
              <Card wallpaper={item} index={index} columns={columns}/>
          )}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={200}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEnabled
          indicatorStyle='white'
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: "100%",
    paddingBottom: 10
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  }
});

export default CardList;