import { menuItems } from '@/constants/MenuItems';
import { theme } from '@/constants/Theme';
import { AppContext } from '@/context/AppContext';
import { logout } from '@/services/auth';
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
  const { state, signOff, toggleReauthenticateModalVisibility } =
    useContext(AppContext);

  const handleItemClick = async (path: string, item: string) => {
    if (!path && item === 'Logout') {
      const isLoggedOut = await logout();
      if (isLoggedOut) signOff();
    } else if (!path && item === 'Delete Account') {
      toggleReauthenticateModalVisibility(true);
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
          if (!state.isLoggedIn && !menuItem.showOnLoggedOut) {
            return null;
          }
          return (
            <TouchableOpacity
              style={styles.menuItems}
              key={menuItem.item}
              onPress={() => handleItemClick(menuItem.path, menuItem.item)}
            >
              {menuItem.icon}
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
