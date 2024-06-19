import { theme } from '@/constants/theme';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Favourites() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;

  return (
    <View style={[styles.container, { marginTop }]}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.background}
        barStyle={"light-content"}
      />
      <Text style={{ color: theme.colors.white }}>Favourites Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
});
