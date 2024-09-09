import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomTabBar} from '../components';
import {TestScreen} from '../pages';
import {NavigationRoutes} from '../utils';
import HomeStack from './HomeStack';
import MTHomeStack from './Maintenance/MTHomeStack';
import ProfileStack from './ProfileStack';
import {useUserStore} from '../stores';

const Tab = createBottomTabNavigator();

const renderTabBar = (props: any) => <CustomTabBar {...props} />;

function Hometab() {
  const {user, isConnected} = useUserStore() as any;
  return (
    <>
      <Tab.Navigator initialRouteName="Home" tabBar={renderTabBar}>
        {isConnected || user?.roleId === '102' ? (
          <>
            <Tab.Screen
              name={NavigationRoutes.HOME}
              component={user?.roleId === '102' ? MTHomeStack : HomeStack}
              options={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
              }}
            />
            <Tab.Screen
              name={NavigationRoutes.PROFILE}
              component={ProfileStack}
              options={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
              }}
            />
            <Tab.Screen name={NavigationRoutes.MORE} component={TestScreen} />
          </>
        ) : (
          <>
            <Tab.Screen
              name={NavigationRoutes.HOME}
              component={HomeStack}
              options={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
              }}
            />

            <Tab.Screen
              name={NavigationRoutes.MORE}
              component={TestScreen}
              options={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </>
  );
}

export default Hometab;
