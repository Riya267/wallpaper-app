import AppliedFiltersList from '@/components/AppliedFilters';
import CardListContainer from '@/components/CardListContainer';
import CategoriesList from '@/components/Categories';
import FilterModal from '@/components/FilterModal';
import Header from '@/components/Header';
import { theme } from '@/constants/Theme';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;
  const router = useRouter();
  const { state, setLoggedInStateOnAuthChange } = useContext(AppContext);
  
  useEffect(() => {
      if(state.isLoggedInStateOnAuthUpdated) setLoggedInStateOnAuthChange();
  }, [state.isLoggedIn]);
  
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
          <CardListContainer router={router}/>
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
