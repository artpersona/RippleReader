import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationRoutes} from '../utils';
import Hometab from './HomeTab';
import {MoreLanding} from '../pages';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NavigationRoutes.MAIN_LANDING} component={Hometab} />
      <Stack.Screen
        name={NavigationRoutes.MORE_LANDING}
        component={MoreLanding}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
