import { theme } from '@/constants/theme';
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar, StyleSheet } from 'react-native';
import ImageViewer from '@/components/imageViewer';

export default function ImageModal() {
  const { imageUrl, imageHeight, imageWidth } = useLocalSearchParams<{ imageUrl: string; imageHeight: string; imageWidth: string }>();

  return (
    <BlurView intensity={100} tint="dark" style={styles.blurView}>
      <StatusBar
        animated
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <ImageViewer 
        imageUrl={imageUrl!}
        imageHeight={imageHeight!}
        imageWidth={imageWidth!}
      />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
