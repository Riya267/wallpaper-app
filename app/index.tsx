import CardList from '@/components/cardList';
import CategoriesList from '@/components/categories';
import Header from '@/components/header';
import { theme } from '@/constants/theme';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ModalScreen() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;

  return (
    <View style={[styles.container, { marginTop }]}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.background}
        barStyle={"light-content"}
      />
        <Header />
        <CategoriesList />
        <View style={styles.imageGridContainer}>
          <CardList />
        </View>
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
