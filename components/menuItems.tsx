import categories from '@/constants/categories';
import { menuItems } from '@/constants/menuItems';
import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';

const MenuItems: React.FC = () => {
  const router = useRouter();
  const { state, signOff } = useContext(AppContext);

  const handleItemClick = (path: string, item: string) => {
    if (!path && item === 'Logout') {
      signOff();
    } else {
      state.isLoggedIn
        ? router.push({ pathname: path } as never)
        : Toast.show({
            type: ALERT_TYPE.INFO,
            title: 'Login',
            textBody: 'Please Login to access this screen',
          });
    }
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <ScrollView scrollEnabled>
        {menuItems.map((menuItem) => {
          if (!state.isLoggedIn && menuItem.item === 'Logout') {
            return null;
          }
          return (
            <TouchableOpacity
              style={styles.menuItems}
              key={menuItem.item}
              onPress={() => handleItemClick(menuItem.path, menuItem.item)}
            >
              <MaterialIcons
                name={menuItem.icon as any}
                size={24}
                color={theme.colors.pink}
              />
              <Text
                style={{
                  color: theme.colors.white,
                  fontWeight: '500',
                  marginLeft: 5,
                }}
              >
                {menuItem.item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItems: {
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default MenuItems;
