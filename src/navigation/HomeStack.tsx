import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoutes} from '../utils';
import {HomeLanding, AccountLanding, MeterReading, SOA} from '../pages';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationRoutes.HOME_LANDING}
        component={HomeLanding}
      />
      <Stack.Screen
        name={NavigationRoutes.ACCOUNT_LANDING}
        component={AccountLanding}
      />
      <Stack.Screen
        name={NavigationRoutes.METER_READING}
        component={MeterReading}
      />
      <Stack.Screen name={NavigationRoutes.SOA} component={SOA} />
    </Stack.Navigator>
  );
};

export default HomeStack;
