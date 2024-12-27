import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {downloadReadingListAPI} from '../services/downloadAPI';
import {
  getClustersAPI,
  submitReadingAPI,
  getSOAAPI,
} from '../services/meterReadingAPI';

// type FilterData = {
//   clusterID: string | null;
//   statusName: string | null;
// };

const initialState = {
  activeProject: '',
  downloadClusters: [],
  downloadedClusterData: [],
  sessionDownloadedData: [],
  pendingActions: [],
  activeKey: '',
  showDownloadsView: false,
  clusterLoading: false,
  downloading: false,
  filterData: {
    clusterID: null,
    statusName: null,
  },
};

/*
  1. queued
  2. completed 
  3. printed 
*/

const useDownloadStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setFilterData: (filterData: any) => {
        set({filterData: filterData});
      },

      setActiveProject: (projectID: string) => {
        set({activeProject: projectID});
      },

      setActiveKey: (key: string) => {
        set({activeKey: key});
      },
      loadClusters: (site_id: number) => {
        set({clusterLoading: true});
        const {downloadedClusterData, downloadClusters} = get() as any;
        getClustersAPI(true, site_id)
          .then((res: any) => {
            const clusters = res.map((cluster: any) => {
              const hasDownloadedData = downloadedClusterData[cluster.id];
              const existingCluster = downloadClusters.find(
                (c: any) => c.id === cluster.id,
              );
              if (existingCluster) {
                return {
                  id: cluster.id,
                  name: cluster.name,
                  count: cluster.count,
                  isDownloaded: hasDownloadedData ? true : false,
                  pending: hasDownloadedData ? false : existingCluster.pending,
                  site_id: site_id,
                };
              }
              return {
                id: cluster.id,
                name: cluster.name,
                count: cluster.count,
                isDownloaded: hasDownloadedData ? true : false,
                pending: false,
                site_id: site_id,
              };
            });

            const filteredClusters = clusters.filter(
              (cluster: any) => cluster.count > 0,
            );
            set({downloadClusters: filteredClusters});
          })
          .catch((e: any) => {
            console.log('error', e);
          })
          .finally(() => {
            set({clusterLoading: false});
          });
      },

      syncSessionDownloadedData: (clusterID: number, downloadedData: any) => {
        const {downloadedClusterData, downloadClusters} = get() as any;
        const tempData = {...downloadedClusterData};
        tempData[clusterID] = downloadedData;
        const updatedClusters = downloadClusters.map((cluster: any) => {
          if (cluster.id === clusterID) {
            return {...cluster, isDownloaded: true, pending: false};
          }
          return cluster;
        });
        set({downloadClusters: updatedClusters});
        set({downloadedClusterData: tempData});
      },

      refreshPendingDownloads: () => {
        console.log('refreshPendingDownloads');
        const {downloadClusters, syncSessionDownloadedData} = get() as any;
        const pendingClusters = downloadClusters.filter(
          (cluster: any) => cluster.pending,
        );

        console.log('pendingClusters', pendingClusters);
        pendingClusters.forEach(async (cluster: any) => {
          try {
            const downloadedData = await downloadReadingListAPI(cluster.id);
            syncSessionDownloadedData(cluster.id, downloadedData);
          } catch (e) {
            console.log('error in downloading', e);
          }
        });
      },

      removePrintedActions: () => {
        const {pendingActions} = get() as any;
        const tempActions = [...pendingActions];
        const newActions = tempActions.filter(
          (action: any) => action.status !== 'printed',
        );
        console.log('newActions', newActions);
        set({pendingActions: newActions});
      },

      markReadingActionAsPrinted: (readingAction: any) => {
        const {pendingActions} = get() as any;
        const tempActions = [...pendingActions];
        const existingActionIndex = tempActions.findIndex(
          (action: any) =>
            action.clusterID === readingAction.clusterID &&
            action.accountID === readingAction.accountID,
        );

        if (existingActionIndex > -1) {
          tempActions[existingActionIndex] = {
            ...readingAction,
            status: 'printed',
          };
        }

        set({pendingActions: tempActions});
      },

      modifyReadingAction: (payload: any, details: any) => {
        const {pendingActions} = get() as any;
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

        const existingActionIndex = tempActions.findIndex(
          (action: any) =>
            action.clusterID === clusterID && action.accountID === accountID,
        );

        if (existingActionIndex > -1) {
          tempActions[existingActionIndex] = newAction;
        } else {
          tempActions.push(newAction);
        }

        set({pendingActions: tempActions});
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
        const {downloadClusters} = get() as any;
        const markAsDownloading = downloadClusters.map((cluster: any) => {
          if (cluster.id === clusterId) {
            return {...cluster, pending: true};
          }
          return cluster;
        });
        set({downloadClusters: markAsDownloading});

        try {
          const downloadedData = await downloadReadingListAPI(clusterId);

          return downloadedData;
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
        const {pendingActions} = get() as any;
        const tempActions = [...pendingActions];

        Promise.all(
          tempActions.map(async (action: any) => {
            if (action.status === 'queued') {
              const {payload} = action;
              const params = {
                ...payload,
              };
              delete params.previous_reading;
              const formData = new FormData();
              for (const key in params) {
                if (key === 'attachment') {
                  formData.append(key, {
                    uri: params[key].uri,
                    type: params[key].type,
                    name: params[key].name,
                  });
                } else {
                  formData.append(key, params[key]);
                }
              }
              const readingData = await submitReadingAPI(formData);
              console.log('readingData', readingData);
              const soaData = await getSOAAPI(readingData.soa_id);

              return {
                ...action,
                soaData: soaData,
                status: 'completed',
              };
            }
            return action;
          }),
        )
          .then((data: any) => {
            set({pendingActions: data});
          })
          .catch(e => {
            console.log('syncing error', e);
          });
      },
    }),
    {
      name: 'download-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useDownloadStore;
