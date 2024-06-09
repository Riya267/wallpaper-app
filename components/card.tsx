import { theme } from '@/constants/theme';
import { WallpaperInterface } from '@/context/appContext';
import { getImageSize } from '@/util/helper';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';

type CardProps = {
  wallpaper: WallpaperInterface,
  index: number,
  columns: number
}

export default function Card({ wallpaper, index, columns }: CardProps) {

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
                  source={{ uri: wallpaper.webformatURL}} 
                  style={[styles.image, getImageHeight()]}
                />
          </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
      objectFit: "fill",
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
