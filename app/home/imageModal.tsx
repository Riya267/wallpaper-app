import { theme } from '@/constants/theme';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { getImageSize } from '@/util/helper';

export default function ImageModal() {
  const router = useRouter();
  const { imageUrl, imageHeight, imageWidth  } = useLocalSearchParams<{ imageUrl: string; imageHeight: string; imageWidth: string }>();

  return (
    <BlurView intensity={70} tint="dark" style={styles.blurView}>
      <StatusBar
        animated
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Image 
          source={{ uri: imageUrl }}
          style={[styles.image, { height: getImageSize(+imageHeight, +imageWidth) }]}
          resizeMode="contain"
        />
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
    height: 400,
    width: 300,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 15,
  },
});
