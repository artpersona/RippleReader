import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoutes} from '../utils';
import AuthStack from './AuthNavigation';
import MainStack from './MainStack';
import {useUserStore} from '../stores';
import {useEffect} from 'react';
import {requestMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const {user} = useUserStore() as any;

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const statuses = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.NEARBY_WIFI_DEVICES,
        ]);

        if (
          statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.NEARBY_WIFI_DEVICES] === RESULTS.GRANTED
        ) {
          console.log('All permissions granted');
        } else {
          console.log('Some permissions were denied', statuses);
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    };

    requestPermissions();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {user ? (
        <Stack.Screen name={NavigationRoutes.MAIN} component={MainStack} />
      ) : (
        <Stack.Screen name={NavigationRoutes.AUTH} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
