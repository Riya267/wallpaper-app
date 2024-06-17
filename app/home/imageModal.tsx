import { theme } from '@/constants/theme';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar, StyleSheet, View, TouchableOpacity, Platform, ActivityIndicator, Alert } from 'react-native';
import { width } from '@/util/helper';
import { Image } from 'expo-image';
import * as fileSystem from 'expo-file-system'
import { useState } from 'react';
import { shareAsync } from 'expo-sharing';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export default function ImageModal() {
  const router = useRouter();
  const { imageUrl, imageHeight, imageWidth  } = useLocalSearchParams<{ imageUrl: string; imageHeight: string; imageWidth: string }>();
  const [ loadingState, setLoadingState ] = useState("");

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
  
  const filePath = `${fileSystem.documentDirectory}${imageUrl?.split('/').pop()}`

  const handleShare = async () => {
    setLoadingState("share")
    const uri = await downloadImage();
    if(uri) {
      await shareAsync(uri);
    }
  }

  const handleDownload = async () => {
    setLoadingState("download")
    const uri = await downloadImage();
    if(uri) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Image Downloaded Successfully"
      })
    }else{
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Failed",
        textBody: "Image Download Failed"
      })
    }
    router.back();
  }

  const downloadImage = async () => {
    try {
      const { uri } = await fileSystem.downloadAsync(imageUrl, filePath)
      setLoadingState("");
      return uri;
     } catch (error: any) {
      setLoadingState(""); 
      return null;
   }
  }

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
            onLoad={() => setLoadingState("")}
          />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <AntDesign name='close' size={25} color={"white"}/>
          </TouchableOpacity>
            {
              loadingState === "download" ? <ActivityIndicator color={"white"} style={styles.iconButton}/> :
              <TouchableOpacity onPress={() => handleDownload()} style={styles.iconButton}>
                <AntDesign name='download' size={25} color={"white"}/>
              </TouchableOpacity>
            }
          {
              loadingState === "share" ? <ActivityIndicator color={"white"} size={"small"} style={styles.iconButton}/> :
              <TouchableOpacity onPress={() => handleShare()} style={styles.iconButton}>
                <AntDesign name='sharealt' size={25} color={"white"}/>
              </TouchableOpacity>
          }
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
    width: width*0.9,
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 15,
  },
});
