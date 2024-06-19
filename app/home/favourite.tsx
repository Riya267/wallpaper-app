import { misc } from '@/constants/misc';
import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { getDocument } from '@/util/auth';
import { auth } from '@/util/firebase';
import { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Favourites() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;
  const { updateFavourites } = useContext(AppContext);

  useEffect(() => {
    async function fetchWallpapersAndUpdateState() {
      const favouriteWallpaperIds = await getDocument(misc.FAVOURITES_COLLECTION_NAME, auth.currentUser?.uid as string);
      updateFavourites({
        wallpaperIds: favouriteWallpaperIds?.wallpaperIds as Array<number>    
      })
    }
    fetchWallpapersAndUpdateState();
  }, [])

  return (
    <View style={[styles.container, { marginTop }]}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.background}
        barStyle={"light-content"}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
});
