import CardList from '@/components/cardList';
import { misc } from '@/constants/misc';
import { theme } from '@/constants/theme';
import { AppContext, FavouritesInterface } from '@/context/appContext';
import { getDocument } from '@/util/auth';
import { auth } from '@/util/firebase';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Favourites() {
  const router = useRouter()
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;
  const { updateFavourites } = useContext(AppContext);
  const { state } = useContext(AppContext);

  useEffect(() => {
    async function fetchWallpapersAndUpdateState() {
      const favouriteWallpapers = await getDocument(misc.FAVOURITES_COLLECTION_NAME, auth.currentUser?.uid as string);
      updateFavourites(favouriteWallpapers as FavouritesInterface)
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
      <Text style={{ color: theme.colors.white, fontWeight: "600", fontSize: 18 }}>Favourites</Text>
      <View style={{ flex: 1, width: "100%" }}>
        <CardList router={router} wallpapers={state.favourites.wallpapers} loading={false} columns={2}  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
});
