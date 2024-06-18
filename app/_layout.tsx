import { ContextProvider } from '@/context/appContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ContextProvider>
      <AlertNotificationRoot theme="dark">
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="home/imageModal"
            options={{
              headerShown: false,
              presentation: 'transparentModal',
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="home/generate"
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="drawer/index"
            options={{
              headerShown: false,
              presentation: 'transparentModal',
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen
            name="auth/login"
            options={{
              headerShown: false,
              presentation: 'containedModal',
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen
            name="auth/register"
            options={{
              headerShown: false,
              presentation: 'containedModal',
              animation: 'slide_from_left',
            }}
          />
        </Stack>
      </AlertNotificationRoot>
    </ContextProvider>
  );
}
