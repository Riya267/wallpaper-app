import CardList from '@/components/CardList';
import { theme } from '@/constants/Theme';
import { AppContext } from '@/context/AppContext';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext} from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable, TouchableOpacity } from 'react-native';
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
        {state.favourites.wallpapers?.length > 0 ?
        <CardList router={router} wallpapers={state.favourites.wallpapers} loading={false} columns={2}  />
        : <View style={{display: "flex", justifyContent: "center", alignItems: "center", flex: 0.9 }}>
             <Text style={{ color: theme.colors.white }}>You have not saved any favourite wallpapers</Text>
             <TouchableOpacity style={{ backgroundColor: theme.colors.pink, paddingVertical: 10, paddingHorizontal: 20, marginVertical: 25, borderRadius: 20 }} onPress={()=>router.push("/(tabs)/Home/")}>
                <Text style={{ color: theme.colors.white }} >View Wallpapers</Text>
             </TouchableOpacity>
        </View>
        }  
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

