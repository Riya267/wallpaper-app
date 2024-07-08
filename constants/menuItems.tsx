import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { theme } from './theme';

export const menuItems = [
  {
    item: 'Favourites',
    path: 'home/favourite',
    icon: (
      <MaterialIcons name={'favorite'} size={24} color={theme.colors.pink} />
    ),
    showOnLoggedOut: true,
  },
  {
    item: 'Delete Account',
    path: '',
    icon: <AntDesign name={'deleteuser'} size={24} color={theme.colors.pink} />,
    showOnLoggedOut: false,
  },
  {
    item: 'Logout',
    path: '',
    icon: <MaterialIcons name={'logout'} size={24} color={theme.colors.pink} />,
    showOnLoggedOut: false,
  },
];