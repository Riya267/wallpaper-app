import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { MasonryFlashList } from '@shopify/flash-list';
import Card from './Card';
import { WallpaperInterface } from '@/context/AppContext';
import { theme } from '@/constants/Theme';

type CardListProps = {
  router: any;
  wallpapers: WallpaperInterface[];
  loading: boolean;
  columns: number;
  loadMoreWallpapers?: () => void;
};

const ListFooterComponent: React.FC<{ loading: boolean }> = ({ loading }) =>
  loading ? <ActivityIndicator color={theme.colors.pink} size={30} /> : null;

const CardList: React.FC<CardListProps> = ({
  router,
  wallpapers,
  loading,
  columns,
  loadMoreWallpapers,
}) => {
  const renderItem = useCallback(
    ({ item, index }: { item: WallpaperInterface; index: number }) => (
      <Card router={router} wallpaper={item} index={index} columns={columns} />
    ),
    [router, columns]
  );

  const keyExtractor = useCallback(
    (item: WallpaperInterface) => item.id.toString(),
    []
  );

  const footerComponent = useMemo(
    () => <ListFooterComponent loading={loading} />,
    [loading]
  );

  return (
    <View style={styles.container}>
      <MasonryFlashList
        numColumns={columns}
        data={wallpapers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={200}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEnabled
        indicatorStyle="white"
        onEndReached={loadMoreWallpapers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={footerComponent}
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

export default React.memo(CardList);
