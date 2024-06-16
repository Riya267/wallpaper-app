import MenuItems from '@/components/menuItems';
import { theme } from '@/constants/theme';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;
  const router = useRouter();
  console.log("drawer called")
  const isLoggedIn = false;
  const handleLogin = () => {
    router.push({ pathname: "/auth/login" } as never)
  }
  return (
    <View 
    style={[styles.container, { marginTop }]}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.background}
        barStyle={"light-content"}
      />
      <Pressable style={{ alignSelf:"flex-end", margin:15 }} onPress={() => router.back()}>
         <AntDesign name='arrowright' size={25} color={theme.colors.white} />
      </Pressable>
      <View style={{ flex:1, padding: 15, marginTop: 10 }}>
        <View style={{ display: "flex", flexDirection:"row", alignItems: "center" }}> 
          <AntDesign name="user" size={30} color={theme.colors.gray}/>
          { isLoggedIn ? 
            <Text style={{ color: theme.colors.white }}>Hi, {'Riya'}</Text>:
            <TouchableOpacity onPress={handleLogin}>
                <Text style={{ color: theme.colors.white }}>Login</Text>
            </TouchableOpacity>
          }
        </View>
        <MenuItems />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
    width: "50%"
  },
  imageGridContainer: {
    flex: 1
  }
});
