import {create} from 'zustand';
import {
  getReconnectionListAPI,
  getDisconnectionListAPI,
  getOtherListAPI,
} from '../services/maintenanceAPI';
import {getCCFTypesAPI} from '../services/meterReadingAPI';

const initialState = {
  disconnectionList: [],
  reconnectionList: [],
  otherActionsList: [],
  ccfTypes: [],
};

const useMaintenanceStore = create(set => ({
  ...initialState,
  loadMaintenanceList: (search = '', clusters = '') => {
    set({loading: true});

    getDisconnectionListAPI(search, clusters)
      .then((res: any) => {
        set({disconnectionList: res});
      })
      .catch(() => {
        set({disconnectionList: []});
      });
    getReconnectionListAPI(search, clusters)
      .then((res: any) => {
        set({reconnectionList: res});
        set({loading: false});
      })
      .catch(() => {
        set({reconnectionList: []});
        set({loading: false});
      });
  },

  loadOtherActionsList: (search = '', clusters = '') => {
    set({loading: true});
    getOtherListAPI(search, clusters)
      .then((res: any) => {
        set({otherActionsList: res});
        set({loading: false});
      })
      .catch(() => {
        set({otherActionsList: []});
        set({loading: false});
      });
  },

  loadCCFTypes: () => {
    getCCFTypesAPI()
      .then((res: any) => {
        set({ccfTypes: res});
      })
      .catch(() => {
        set({ccfTypes: []});
      });
  },

  setSearchText: (text: string) => {
    set({searchText: text});
  },
}));

export default useMaintenanceStore;
