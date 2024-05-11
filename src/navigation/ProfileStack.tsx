import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoutes} from '../utils';
import {TestScreen} from '../pages';
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationRoutes.PROFILE_LANDING}
        component={TestScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
