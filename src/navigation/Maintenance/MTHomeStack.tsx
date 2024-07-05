import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoutes} from '../../utils';
import {
  ActionScreen,
  MaintenanceHomeLanding,
  OtherActionsLanding,
  Selection,
  FilterScreen,
} from '../../pages';
const Stack = createStackNavigator();

const MTHomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NavigationRoutes.SELECTION} component={Selection} />
      <Stack.Screen
        name={NavigationRoutes.HOME_LANDING}
        component={MaintenanceHomeLanding}
      />
      <Stack.Screen
        name={NavigationRoutes.OTHER_ACTIONS_LANDING}
        component={OtherActionsLanding}
      />
      <Stack.Screen
        name={NavigationRoutes.ACTION_SCREEN}
        component={ActionScreen}
      />
      <Stack.Screen
        name={NavigationRoutes.FILTER_SCREEN}
        component={FilterScreen}
      />
    </Stack.Navigator>
  );
};

export default MTHomeStack;
