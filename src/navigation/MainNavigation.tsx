import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoutes} from '../utils';
import AuthStack from './AuthNavigation';
import MainStack from './MainStack';
import {useUserStore} from '../stores';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const {user} = useUserStore() as any;

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
