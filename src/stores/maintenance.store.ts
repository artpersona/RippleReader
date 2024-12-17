import {create} from 'zustand';
import {
  getReconnectionListAPI,
  getDisconnectionListAPI,
  getOtherListAPI,
} from '../services/maintenanceAPI';
import {getCCFTypesAPI} from '../services/meterReadingAPI';

interface MaintenanceState {
  disconnectionList: any[];
  reconnectionList: any[];
  otherActionsList: any[];
  ccfTypes: any[];
  searchText: string;
  loading: boolean;
  clearStore: () => void;
  loadMaintenanceList: (
    search: string,
    clusters: string,
    activeProjectID: number,
  ) => void;
  loadOtherActionsList: (
    search: string,
    clusters: string,
    activeProjectID: number,
  ) => void;
  loadCCFTypes: () => void;
  setSearchText: (text: string) => void;
}

const initialState: Omit<
  MaintenanceState,
  | 'clearStore'
  | 'loadMaintenanceList'
  | 'loadOtherActionsList'
  | 'loadCCFTypes'
  | 'setSearchText'
> = {
  disconnectionList: [],
  reconnectionList: [],
  otherActionsList: [],
  ccfTypes: [],
  searchText: '',
  loading: false,
};

const useMaintenanceStore = create<MaintenanceState>(set => ({
  ...initialState,
  clearStore: () => set({...initialState}),
  loadMaintenanceList: (
    search = '',
    clusters = '',
    activeProjectID: number,
  ) => {
    set({loading: true});

    getDisconnectionListAPI(search, clusters, activeProjectID)
      .then((res: any) => {
        set({disconnectionList: res});
      })
      .catch(() => {
        set({disconnectionList: []});
      });
    getReconnectionListAPI(search, clusters, activeProjectID)
      .then((res: any) => {
        set({reconnectionList: res});
        set({loading: false});
      })
      .catch(() => {
        set({reconnectionList: []});
        set({loading: false});
      });
  },

  loadOtherActionsList: (search = '', clusters = '', activeProjectID) => {
    set({loading: true});
    getOtherListAPI(search, clusters, activeProjectID)
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
