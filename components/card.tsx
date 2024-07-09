import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';
import { AppContext, WallpaperInterface } from '@/context/appContext';
import { getImageSize } from '@/util/helper';
import { createDocument } from '@/util/auth';
import { misc } from '@/constants/misc';
import { auth } from '@/util/firebase';
import { theme } from '@/constants/theme';

type CardProps = {
  wallpaper: WallpaperInterface;
  index: number;
  columns: number;
  router: any;
};

const Card: React.FC<CardProps> = ({ wallpaper, index, columns, router }) => {
  const { state, updateFavourites } = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(
    state.favourites.wallpapers?.some(
      (favWallpaper) => favWallpaper.id === wallpaper.id
    ) || false
  );
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);

  const isLastInRow = useMemo(
    () => (index + 1) % columns === 0,
    [index, columns]
  );

  const getImageHeight = useMemo(() => {
    const { imageHeight, imageWidth } = wallpaper;
    return { height: getImageSize(imageHeight, imageWidth) };
  }, [wallpaper]);

  const handleAddToFavourite = useCallback(async () => {
    try {
      setIsAddingToFavorites(true);
      const updatedWallpapers = isFavourite
        ? state.favourites.wallpapers?.filter(
            (favWallpaper) => favWallpaper.id !== wallpaper.id
          )
        : [...(state.favourites.wallpapers || []), wallpaper];

      const favouriteWallpaper = { wallpapers: updatedWallpapers };
      await createDocument(
        misc.FAVOURITES_COLLECTION_NAME,
        favouriteWallpaper,
        auth.currentUser?.uid as string
      );

      updateFavourites({
        wallpapers: favouriteWallpaper.wallpapers as Array<WallpaperInterface>,
      });
      setIsFavourite(!isFavourite);
      setIsAddingToFavorites(false);
    } catch (error) {
      console.error('Error updating favourites:', error);
    }
  }, [isFavourite, state.favourites.wallpapers, updateFavourites, wallpaper]);

  useEffect(() => {
    setIsFavourite(
      state.favourites.wallpapers?.some(
        (favWallpaper) => favWallpaper.id === wallpaper.id
      ) || false
    );
  }, [state.favourites.wallpapers, wallpaper.id]);

  return (
    <TouchableOpacity
      style={[styles.imageWrapper, !isLastInRow && styles.spacing]}
      onPress={() =>
        router.push({
          pathname: 'home/imageModal',
          params: {
            imageUrl: wallpaper.webformatURL,
            imageHeight: wallpaper.imageHeight,
            imageWidth: wallpaper.imageWidth,
          },
        })
      }
    >
      {auth.currentUser?.uid &&
        (isAddingToFavorites ? (
          <View style={styles.favouriteIconWrapper}>
            <ActivityIndicator
              color={theme.colors.pink}
              style={styles.favouriteIconBackground}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleAddToFavourite}
            style={styles.favouriteIconWrapper}
          >
            <View style={styles.favouriteIconBackground}>
              <AntDesign
                name={isFavourite ? 'heart' : 'hearto'}
                size={20}
                color={theme.colors.white}
              />
            </View>
          </TouchableOpacity>
        ))}
      <Image
        source={wallpaper.webformatURL}
        placeholder={wallpaper.tags}
        style={[styles.image, getImageHeight]}
        contentFit="cover"
        transition={1000}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  imageWrapper: {
    backgroundColor: theme.colors.gray,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  spacing: {
    marginHorizontal: 5,
  },
  favouriteIconWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  favouriteIconBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(Card);
