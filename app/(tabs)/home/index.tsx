import AppliedFiltersList from '@/components/appliedFilters';
import CardList from '@/components/cardList';
import CategoriesList from '@/components/categories';
import FilterModal from '@/components/filterModal';
import Header from '@/components/header';
import { misc } from '@/constants/misc';
import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { getDocument } from '@/util/auth';
import { auth } from '@/util/firebase';
import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;
  const router = useRouter();
  const { updateFavourites } = useContext(AppContext);
  
  useEffect(() => {
    if(auth.currentUser?.uid) {
      async function fetchWallpapersAndUpdateState() {
        const favouriteWallpaperIds = await getDocument(misc.FAVOURITES_COLLECTION_NAME, auth.currentUser?.uid as string);
        console.log("favourites", favouriteWallpaperIds)
        updateFavourites({
          wallpaperIds: favouriteWallpaperIds?.wallpaperIds as Array<number>    
        })
      }
      fetchWallpapersAndUpdateState();
    }
  }, [])
  
  return (
    <View style={[styles.container, { marginTop }]}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.background}
        barStyle={"light-content"}
      />
        <Header />
        <CategoriesList />
        <AppliedFiltersList />
        <View style={styles.imageGridContainer}>
          <CardList router={router}/>
        </View>
        <FilterModal />
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
  },
  imageGridContainer: {
    flex: 1
  }
});