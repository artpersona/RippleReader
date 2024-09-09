import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {downloadReadingListAPI} from '../services/downloadAPI';
import {getClustersAPI} from '../services/meterReadingAPI';
const initialState = {
  downloadClusters: [],
  downloadedClusterData: [],
  pendingActions: [],
  showDownloadsView: false,
  downloading: false,
};

const useDownloadStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      loadClusters: () => {
        const {downloadedClusterData} = get() as any;
        getClustersAPI(true)
          .then((res: any) => {
            const clusters = res.map((cluster: any) => {
              const hasDownloadedData = downloadedClusterData[cluster.id];
              return {
                id: cluster.id,
                name: cluster.name,
                count: cluster.count,
                isDownloaded: hasDownloadedData ? true : false,
              };
            });

            const filteredClusters = clusters.filter(
              (cluster: any) => cluster.count > 0,
            );

            set({downloadClusters: filteredClusters});
          })
          .catch((e: any) => {
            console.log('error', e);
          });
      },

      addReadingAction: (payload: any, details: any) => {
        const {downloadClusters, downloadedClusterData, pendingActions} =
          get() as any;
        const tempActions = [...pendingActions];
        const clusterID = details.accountDetails.cluster_id;
        const accountID = details.accountDetails.id;

        const newAction = {
          payload: payload,
          details: details,
          clusterID: clusterID,
          accountID: accountID,
          status: 'queued',
        };

        const newDownloadedClusterData = {...downloadedClusterData};
        // Remove the account from the downloaded data
        if (newDownloadedClusterData[clusterID]) {
          newDownloadedClusterData[clusterID] = newDownloadedClusterData[
            clusterID
          ].filter((account: any) => account.id !== accountID);
        }

        // Decrement the count of the cluster and remove it if it's 0
        const newDownloadClusters = downloadClusters.map((cluster: any) => {
          if (cluster.id === clusterID) {
            const newCluster = {...cluster};
            newCluster.count = newCluster.count - 1;
            if (newCluster.count === 0) {
              newCluster.isDownloaded = false;
            }
            return newCluster;
          }
          return cluster;
        });

        set({downloadClusters: newDownloadClusters});
        set({downloadedClusterData: newDownloadedClusterData});
        tempActions.push(newAction);
        set({pendingActions: tempActions});
      },

      downloadClusterData: async (clusterId: string) => {
        const {downloadedClusterData, downloadClusters} = get() as any;

        const markAsDownloading = downloadClusters.map((cluster: any) => {
          if (cluster.id === clusterId) {
            return {...cluster, pending: true};
          }
          return cluster;
        });
        set({downloadClusters: markAsDownloading});

        try {
          const downloadedData = await downloadReadingListAPI(clusterId);
          console.log('downloadedData', downloadedData);
          const tempData = {...downloadedClusterData};
          tempData[clusterId] = downloadedData;
          const updatedClusters = downloadClusters.map((cluster: any) => {
            if (cluster.id === clusterId) {
              return {...cluster, isDownloaded: true};
            }
            return cluster;
          });

          set({downloadClusters: updatedClusters});
          set({downloadedClusterData: tempData});
        } catch (e) {
          console.log('error', e);
          const updatedClusters = downloadClusters.map((cluster: any) => {
            if (cluster.id === clusterId) {
              return {...cluster, isDownloaded: false, pending: false};
            }
            return cluster;
          });

          set({downloadClusters: updatedClusters});
        }
      },

      syncReadingList: async () => {
        console.log('syncReadingList');
        // set({downloading: true});
        // try {
        //   const response = await downloadReadingListAPI();
        //   console.log('response', response);
        // } catch (e) {
        //   console.log('error', e);
        // } finally {
        //   set({downloading: false});
        // }
      },
    }),
    {
      name: 'download-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useDownloadStore;
