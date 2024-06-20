import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { MasonryFlashList } from '@shopify/flash-list';
import Card from './card';
import { WallpaperInterface } from '@/context/appContext';
import { theme } from '@/constants/theme';

type CardListProps = {
  router: any;
  wallpapers: WallpaperInterface[];
  loading: boolean;
  columns: number;
  loadMoreWallpapers?: () => void;
};

const CardList: React.FC<CardListProps> = ({
  router,
  wallpapers,
  loading,
  columns,
  loadMoreWallpapers,
}) => {
  return (
    <View style={styles.container}>
      <MasonryFlashList
        numColumns={columns}
        data={wallpapers}
        renderItem={({ item, index }) => (
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
          loading ? (
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
