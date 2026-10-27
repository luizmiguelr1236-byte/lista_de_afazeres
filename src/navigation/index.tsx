import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appbar, Switch, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { createStaticNavigation, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import {Login} from './screens/Login'
import { NotFound } from './screens/NotFound';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = { ...MD3LightTheme, ...LightTheme };
const CombinedDarkTheme = { ...MD3DarkTheme, ...DarkTheme };

export const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Image source={newspaper} style={{ width: size, height: size, tintColor: color }} />
        ),
      },
    },
  },
     Login: {
      screen:Login,
      options: {
        title: 'Login',
        tabBarIcon: ({ color, size }) => (
          <Image source={newspaper} style={{ width: size, height: size, tintColor: color }} />
        ),
      },
    },
  
  }
);
 

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: { title: 'Home', headerShown: false },
    },
    NotFound: {
      screen: NotFound,
      options: { title: '404' },
      linking: { path: '*' },
    },
  },
});

const Header = ({ theme, isThemeDark, toggleTheme }: { theme?: any; isThemeDark: boolean; toggleTheme: () => void }) => (
  <Appbar.Header theme={{ colors: { primary: theme?.colors.surface } }}>
    <Switch color={'red'} value={isThemeDark} onValueChange={toggleTheme} />
  </Appbar.Header>
);

export const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => setIsThemeDark(!isThemeDark), [isThemeDark]);
  const preferences = React.useMemo(() => ({ toggleTheme, isThemeDark }), [toggleTheme, isThemeDark]);

  return (
    <PreferencesContext.Provider value={preferences}>
      <Navigation theme={theme} />
    </PreferencesContext.Provider>
  );
}
