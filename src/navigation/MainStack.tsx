import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationRoutes} from '../utils';
import Hometab from './HomeTab';
import {
  MoreLanding,
  DownloadList,
  DownloadLanding,
  TaskQueue,
  QueueFilterSelector,
  QueueStatusSelector,
} from '../pages';
import useDownloadStore from '../stores/download.store';
import {useUserStore} from '../stores';
import {useEffect} from 'react';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  const {syncReadingList, refreshPendingDownloads} = useDownloadStore() as any;
  const {isConnected} = useUserStore() as any;

  useEffect(() => {
    (async () => {
      if (isConnected) {
        await refreshPendingDownloads();
      }
      await syncReadingList();
    })();
  }, [isConnected, syncReadingList, refreshPendingDownloads]);

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
      <Stack.Screen
        name={NavigationRoutes.DOWNLOAD_SCREEN}
        component={DownloadList}
      />

      <Stack.Screen
        name={NavigationRoutes.DOWNLOAD_LANDING}
        component={DownloadLanding}
      />

      <Stack.Screen
        name={NavigationRoutes.QueueClusterFilter}
        component={QueueFilterSelector}
      />
      <Stack.Screen
        name={NavigationRoutes.QueueStatusFilter}
        component={QueueStatusSelector}
      />

      <Stack.Screen name={NavigationRoutes.TASKQUEUE} component={TaskQueue} />
    </Stack.Navigator>
  );
};

export default MainStack;
