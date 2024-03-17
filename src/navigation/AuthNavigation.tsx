import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash, Login, AuthLanding} from '../pages';
import {NavigationRoutes} from '../utils';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NavigationRoutes.SPLASH} component={Splash} />
      <Stack.Screen
        name={NavigationRoutes.AUTH_LANDING}
        component={AuthLanding}
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen name={NavigationRoutes.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
