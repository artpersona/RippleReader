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
  SiteList,
} from '../pages';
import useDownloadStore from '../stores/download.store';
import {useUserStore} from '../stores';
import useMeterReadingStore from '../stores/meterReading.store';
import {useEffect} from 'react';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  const {
    syncReadingList,
    refreshPendingDownloads,
    donwloadComputingData,
    computationData,
  } = useDownloadStore() as any;
  const {isConnected} = useUserStore() as any;
  const {loadUserProjects, projects} = useMeterReadingStore() as any;
  console.log('computationData', computationData);
  useEffect(() => {
    loadUserProjects();
  }, [loadUserProjects]);

  useEffect(() => {
    (async () => {
      if (isConnected) {
        await refreshPendingDownloads();
      }

      let tempProjects = [...projects];

      tempProjects = tempProjects.reduce((acc: any, project: any) => {
        acc.push(project.project_id);
        return acc;
      }, []);

      await donwloadComputingData(tempProjects);
      await syncReadingList();
    })();
  }, [
    isConnected,
    syncReadingList,
    refreshPendingDownloads,
    donwloadComputingData,
    projects,
  ]);

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

      <Stack.Screen name={NavigationRoutes.SITE_LIST} component={SiteList} />

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
