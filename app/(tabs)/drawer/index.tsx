import MenuItems from '@/components/menuItems';
import ReauthenticateModal from '@/components/reauthicateModal';
import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { auth } from '@/util/firebase';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;
  const router = useRouter();
  const { state, setLoggedInStateOnAuthChange } = useContext(AppContext);
  const handleLogin = () => {
    router.push({ pathname: "/auth/login" } as never)
  }

  useEffect(() => {
    console.log("onAuthStateChanged from drawer", auth.currentUser, state.isLoggedIn, state.favourites);
    if(!state.isLoggedInStateonAuthUpdated) setLoggedInStateOnAuthChange();
  },[state.isLoggedIn])

  return (
    <View 
      style={[styles.container, { marginTop }]}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.background}
        barStyle={"light-content"}
      />
      <Pressable style={{ alignSelf:"flex-start", margin:15 }} onPress={() => router.back()}>
         <AntDesign name='arrowleft' size={25} color={theme.colors.white} />
      </Pressable>
      <View style={{ flex:1, padding: 15, marginTop: 10, marginRight: 10 }}>
        <View style={{ display: "flex", flexDirection:"row", alignItems: "center" }}> 
          <AntDesign name="user" size={30} color={theme.colors.gray}/>
          { state.isLoggedIn ? 
            <Text style={{ color: theme.colors.white }}>Hi, {state.userName}</Text>:
            <TouchableOpacity onPress={handleLogin}>
                <Text style={{ color: theme.colors.white }}>Login</Text>
            </TouchableOpacity>
          }
        </View>
        <MenuItems />
      </View>
      <ReauthenticateModal />
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
