import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomTabBar} from '../components';
import {TestScreen} from '../pages';
import {NavigationRoutes} from '../utils';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const renderTabBar = (props: any) => <CustomTabBar {...props} />;

function Hometab() {
  return (
    <>
      <Tab.Navigator initialRouteName="Bible" tabBar={renderTabBar}>
        <Tab.Screen
          name={NavigationRoutes.HOME}
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={NavigationRoutes.PROFILE}
          component={ProfileStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen name={NavigationRoutes.MORE} component={TestScreen} />
      </Tab.Navigator>
    </>
  );
}

export default Hometab;
