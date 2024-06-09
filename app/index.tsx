import CardList from '@/components/cardList';
import CategoriesList from '@/components/categories';
import Header from '@/components/header';
import { theme } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ModalScreen() {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top : 30;

  return (
      <View style={[styles.container, { paddingTop }]}>
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <Header />
          <CategoriesList />
          <View style={styles.imageGridContainer}>
            <CardList />
          </View>
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
