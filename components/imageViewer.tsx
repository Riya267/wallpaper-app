import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { width } from '@/util/helper';
import * as fileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

interface ImageViewerProps {
  imageUrl: string;
  imageHeight: string;
  imageWidth: string;
}

export const getImageDimensions = (imageHeight: string, imageWidth: string) => {
  const aspectRatio = Number(imageHeight) / Number(imageWidth);
  const baseWidth = Platform.OS === 'web' ? 0.5 : 0.9;
  const baseHeight = Platform.OS === 'web' ? 0.5 : 0.8;

  const calculatedWidth = width * baseWidth;
  const calculatedHeight = (width * baseHeight) / aspectRatio;

  return aspectRatio < 1
    ? { height: calculatedHeight, width: calculatedHeight * aspectRatio }
    : { height: calculatedHeight, width: calculatedWidth };
};

const ImageViewer: React.FC<ImageViewerProps> = ({
  imageUrl,
  imageHeight,
  imageWidth,
}) => {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState('');

  const filePath = `${fileSystem.documentDirectory}${imageUrl?.split('/').pop()}`;

  const handleShare = async () => {
    setLoadingState('share');
    const uri = await downloadImage();
    if (uri) {
      await shareAsync(uri);
    }
  };

  const handleDownload = async () => {
    setLoadingState('download');
    const uri = await downloadImage();
    if (uri) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Image Downloaded Successfully',
      });
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: 'Image Download Failed',
      });
    }
    router.back();
  };

  const downloadImage = async () => {
    try {
      const { uri } = await fileSystem.downloadAsync(imageUrl, filePath);
      setLoadingState('');
      return uri;
    } catch (error: any) {
      setLoadingState('');
      return null;
    }
  };
  console.log('imageViewer Props', imageUrl);
  return (
    <View style={styles.container}>
      <View style={getImageDimensions(imageHeight, imageWidth)}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, getImageDimensions(imageHeight, imageWidth)]}
          transition={1000}
          contentFit="contain"
          onLoad={() => setLoadingState('')}
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <AntDesign name="close" size={25} color={'white'} />
        </TouchableOpacity>
        {loadingState === 'download' ? (
          <ActivityIndicator color={'white'} style={styles.iconButton} />
        ) : (
          <TouchableOpacity
            onPress={() => handleDownload()}
            style={styles.iconButton}
          >
            <AntDesign name="download" size={25} color={'white'} />
          </TouchableOpacity>
        )}
        {loadingState === 'share' ? (
          <ActivityIndicator
            color={'white'}
            size={'small'}
            style={styles.iconButton}
          />
        ) : (
          <TouchableOpacity
            onPress={() => handleShare()}
            style={styles.iconButton}
          >
            <AntDesign name="sharealt" size={25} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    borderRadius: 20,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: width * 0.9,
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 15,
  },
});

export default ImageViewer;
