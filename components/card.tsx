import { theme } from '@/constants/theme';
import { WallpaperInterface } from '@/context/appContext';
import { getImageSize } from '@/util/helper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

type CardProps = {
  wallpaper: WallpaperInterface,
  index: number,
  columns: number
}

const Card: React.FC<CardProps> = ({ wallpaper, index, columns }) => {

  const isLastInRow = () => {
   return (index+1 % columns === 0)
  }

  const getImageHeight = () => {
    let { imageHeight, imageWidth } = wallpaper;
     return { height: getImageSize(imageHeight, imageWidth)}
  }

  return (
          <TouchableOpacity style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
                <Image 
                  source={wallpaper.webformatURL}
                  placeholder={wallpaper.tags}
                  style={[styles.image, getImageHeight()]}
                  contentFit="cover"
                  transition={1000}
                />
          </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
      width: "100%",
      height: 300
  },
  imageWrapper: {
    backgroundColor: theme.colors.gray,
    borderRadius: 20,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: 20,
  },
  spacing: {
    marginHorizontal: 5
  }
});

export default Card;