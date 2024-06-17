import MenuItems from '@/components/menuItems';
import { theme } from '@/constants/theme';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;
  const router = useRouter();
  console.log("drawer called")
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
          <Text style={{ color: theme.colors.white }}>Hi, {'Riya'}</Text>
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
