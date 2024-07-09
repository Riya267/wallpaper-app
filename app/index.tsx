import { theme } from '@/constants/Theme';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { top: safeAreaTop } = useSafeAreaInsets();
  const marginTop = safeAreaTop > 0 ? safeAreaTop : 30;
  const router = useRouter();

  return (
    <View style={[styles.container, { marginTop }]}>
      <StatusBar
        animated
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <Image
        source={require('../assets/images/wallpapers.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <BlurView intensity={115} tint="dark" style={styles.blurContainer}>
        <Text style={styles.description}>
          Explore millions of cool wallpapers designed by top artists to elevate
          your device.
        </Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => router.push('/Home/')}
        >
          <Text style={styles.exploreButtonText}>Get Started</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurContainer: {
    padding: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  description: {
    fontSize: 24,
    fontWeight: '900',
    color: theme.colors.white,
    textAlign: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  exploreButton: {
    backgroundColor: theme.colors.pink,
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: 18,
  },
});
