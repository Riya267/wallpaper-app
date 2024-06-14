import AppliedFiltersList from '@/components/appliedFilters';
import CardList from '@/components/cardList';
import CategoriesList from '@/components/categories';
import FilterModal from '@/components/filterModal';
import Header from '@/components/header';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;
  const router = useRouter();

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
        <Toast />
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
