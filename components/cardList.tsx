import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { AppContext, WallpaperInterface } from '@/context/appContext';
import { MasonryFlashList } from "@shopify/flash-list";
import Card from './card';
import { getColumns } from '@/util/helper';

export default function CardList() {
  const { state, fetchPosts } = useContext(AppContext);

  useEffect(() => {
    fetchPosts();
  }, []);

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
