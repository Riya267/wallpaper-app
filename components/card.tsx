import { theme } from '@/constants/theme';
import { AppContext, WallpaperInterface } from '@/context/appContext';
import { getImageSize } from '@/util/helper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';
import { createDocument } from '@/util/auth';
import { misc } from '@/constants/misc';
import { auth } from '@/util/firebase';
import { useContext, useEffect, useState } from 'react';

type CardProps = {
  wallpaper: WallpaperInterface;
  index: number;
  columns: number;
  router: any;
};

const Card: React.FC<CardProps> = ({ wallpaper, index, columns, router }) => {
  const { state, updateFavourites } = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(
    state.favourites.wallpaperIds.some(
      (favouriteWallpaperId) => favouriteWallpaperId === wallpaper.id
    )
  );

  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };

  const getImageHeight = () => {
    const { imageHeight, imageWidth } = wallpaper;
    return { height: getImageSize(imageHeight, imageWidth) };
  };

  const handleAddToFavourite = async () => {
    try {
      const updatedWallpaperIds = isFavourite
        ? state.favourites.wallpaperIds.filter(
            (wallpaperId) => wallpaperId !== wallpaper.id
          )
        : [...(state.favourites.wallpaperIds || []), wallpaper.id];

      const favouriteWallpaper = { wallpaperIds: updatedWallpaperIds };
      console.log('favouriteWallpaper', favouriteWallpaper);

      await createDocument(
        misc.FAVOURITES_COLLECTION_NAME,
        favouriteWallpaper,
        auth.currentUser?.uid as string
      );

      updateFavourites({ wallpaperIds: favouriteWallpaper.wallpaperIds });
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const isFav = state.favourites.wallpaperIds.some(
      (favouriteWallpaperId) => favouriteWallpaperId === wallpaper.id
    );
    setIsFavourite(isFav);
  }, [state.favourites.wallpaperIds, wallpaper.id]);

  return (
    <TouchableOpacity
      style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}
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
      {auth.currentUser?.uid && (
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
      )}
      <Image
        source={wallpaper.webformatURL}
        placeholder={wallpaper.tags}
        style={[styles.image, getImageHeight()]}
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

export default Card;
