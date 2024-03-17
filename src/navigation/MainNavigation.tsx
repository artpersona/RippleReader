import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoutes} from '../utils';
import AuthStack from './AuthNavigation';
const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NavigationRoutes.AUTH} component={AuthStack} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
