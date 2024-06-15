import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AppContext, WallpaperInterface } from '@/context/appContext';
import { MasonryFlashList } from '@shopify/flash-list';
import Card from './card';
import { getColumns } from '@/util/helper';
import { theme } from '@/constants/theme';

const CardList: React.FC<any> = ({ router }) => {
  const { state, fetchWallpapers, setPage } = useContext(AppContext);

  useEffect(() => {
    fetchWallpapers();
  }, [
    state.page,
    state.queryString,
    state.selectedCategory,
    state.appliedFilters,
  ]);

  const columns = getColumns();

  const loadMoreWallpapers = () => {
    if (!state.loading && state.scrollMoreWallpapers) {
      console.log('page', state.page);
      setPage(state.page + 1);
    }
  };

  return (
    <View style={styles.container}>
      <MasonryFlashList
        numColumns={columns}
        data={state.wallpapers}
        renderItem={({
          item,
          index,
        }: {
          item: WallpaperInterface;
          index: number;
        }) => (
          <Card
            router={router}
            wallpaper={item}
            index={index}
            columns={columns}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={200}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEnabled
        indicatorStyle="white"
        onEndReached={loadMoreWallpapers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          state.loading ? (
            <ActivityIndicator color={theme.colors.pink} size={30} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: '100%',
    paddingBottom: 10,
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
});

export default CardList;
