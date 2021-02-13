
import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/DetailScreen';
import Setting1Screen from '../screens/Setting1Screen';
import Setting2Screen from '../screens/Setting2Screen';

const Tabs = createBottomTabNavigator();

export const StartScreenTabs = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Welcome" component={WelcomeScreen} options={{ tabBarVisible: false }} />
    <Tabs.Screen name="Main" component={MainScreenTabs} options={{ tabBarVisible: false }} />
  </Tabs.Navigator>
)

const isTabBarVisible = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route)
  if (routeName === undefined) return;
  return !['Detail', 'Add', 'Setting1', 'Setting2'].includes(routeName);
};

const tabBarStyle = () => {}

export const MainScreenTabs = () => (
  <Tabs.Navigator
  screenOptions={({route}) => ({
    tabBarVisible: isTabBarVisible(route),
  })}
  tabBarOptions={{style: {marginBottom: -12}}} //＋Addがoverhangするので...
  >
    <Tabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarIcon: ({color}) => <Image style={{ height: 25, width: 25, tintColor: color }} source={require('../../../assets/home.png')}/>,
        
      }}
    />
    <Tabs.Screen
      name="Add"
      component={AddStackScreen}
      options={{
        title: '',
        tabBarVisible: false,
        tabBarIcon: ({color}) => <Image style={{ height: 60, width: 60, tintColor: 'deepskyblue' }} source={require('../../../assets/add.png')}/>
        }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarIcon: ({color}) => <Image style={{ height: 25, width: 25, tintColor: color }} source={require('../../../assets/profile.png')}/>
      }}
    />
  </Tabs.Navigator>
)

const Stack = createStackNavigator();
export const HomeStackScreen = () => (
  <Stack.Navigator screenOptions={headerNavigationOptions}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Terco' }}/>
    <Stack.Screen name="Detail" component={DetailScreen} options={{ headerBackTitle: 'Home' }}/>
  </Stack.Navigator>
)

export const AddStackScreen = ({ navigation }: {navigation: any}) => (
  <Stack.Navigator>
    <Stack.Screen name='Add' component={AddScreen} options={{ header: () => false }} />
  </Stack.Navigator>
  // <Stack.Navigator screenOptions={headerNavigationOptions}>
  //   <Stack.Screen 
  //     name="Add"
  //     component={AddScreen}
  //     options={{
  //       headerLeft: () => (
  //         <Icon
  //           name='close'
  //           color='white'
  //           style={styles.icon}
  //           onPress={() => navigation.navigate('Home')} 
  //         />
  //       )
  //     }}
  //   />
  // </Stack.Navigator>
)

export const ProfileStackScreen = () => (
  <Stack.Navigator screenOptions={headerNavigationOptions}>
    <Stack.Screen name="Profile" component={ProfileScreen}/>
    <Stack.Screen name="Setting1" component={Setting1Screen}/>
    <Stack.Screen name="Setting2" component={Setting2Screen}/>
  </Stack.Navigator>
)

const headerNavigationOptions = {
  headerStyle: {
    backgroundColor: 'deepskyblue',
  },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    padding: 10
  } 
});