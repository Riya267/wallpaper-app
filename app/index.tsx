import CategoriesList from '@/components/categories';
import Header from '@/components/header';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform } from 'react-native';

export default function ModalScreen() {
  return (
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
      <View style={styles.container}>
        <Header />
        <CategoriesList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    height:"100%",
    backgroundColor: "#000000"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
