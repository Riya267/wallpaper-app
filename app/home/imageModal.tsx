import { theme } from '@/constants/theme';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { width } from '@/util/helper';
import { Image } from 'expo-image';

export default function ImageModal() {
  const router = useRouter();
  const { imageUrl, imageHeight, imageWidth  } = useLocalSearchParams<{ imageUrl: string; imageHeight: string; imageWidth: string }>();

  const getImageDimensions = () => {
    const aspectRatio = Number(imageHeight) / Number(imageWidth);
    const baseWidth = Platform.OS === "web" ? 0.50 : 0.90;
    const baseHeight = Platform.OS === "web" ? 0.50 : 0.80;
  
    const calculatedWidth = width * baseWidth;
    const calculatedHeight = width * baseHeight / aspectRatio;
  
    return aspectRatio < 1
      ? { height: calculatedHeight, width: calculatedHeight * aspectRatio }
      : { height: calculatedHeight, width: calculatedWidth };
  };
  

  return (
    <BlurView intensity={100} tint="dark" style={styles.blurView}>
      <StatusBar
        animated
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={getImageDimensions()}>
          <Image 
            source={{ uri: imageUrl }}
            style={[styles.image, getImageDimensions()]}
            transition={1000}
            contentFit='fill'
          />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <AntDesign name='close' size={30} color={"white"}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
            <AntDesign name='download' size={30} color={"white"}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
            <AntDesign name='sharealt' size={30} color={"white"}/>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  image: {
    borderRadius: 20
  },
  iconContainer: {
    display:"flex",
    flexDirection: 'row',
    justifyContent: "space-evenly",
    width: width*90/100,
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 15,
  },
});
