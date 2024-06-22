import CardList from '@/components/cardList';
import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext} from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Favourites() {
  const router = useRouter()
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;
  const { state } = useContext(AppContext);

  return (
    <View style={[styles.container, { marginTop }]}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.background}
        barStyle={"light-content"}
      />
       <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color={theme.colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Favourites</Text>
        <View></View>
      </View>
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
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  headerTitle: {
    color: theme.colors.white,
    fontWeight: "600",
    fontSize: 18,
    alignSelf: "center",
  },
});
function signIn(arg0: string) {
  throw new Error('Function not implemented.');
}

