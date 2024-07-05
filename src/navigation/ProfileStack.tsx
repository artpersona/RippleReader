import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoutes} from '../utils';
import {ProfileLanding} from '../pages';
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationRoutes.PROFILE_LANDING}
        component={ProfileLanding}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
