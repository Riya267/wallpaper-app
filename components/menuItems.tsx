import categories from '@/constants/categories';
import { menuItems } from '@/constants/menuItems';
import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MenuItems: React.FC = () => {
  const router = useRouter();
  const { state, setSelectedCategory, setPage } = useContext(AppContext);

  const handleItemClick = (path: string, item: string) => {
    if (!path && item === 'Logout') {
      // logout function
    } else router.push({ pathname: path } as never);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <ScrollView scrollEnabled>
        {menuItems.map((menuItem) => {
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
    borderWidth: 2,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default MenuItems;
