import {create} from 'zustand';
import {
  getReconnectionListAPI,
  getDisconnectionListAPI,
  getOtherListAPI,
} from '../services/maintenanceAPI';
const initialState = {
  disconnectionList: [],
  reconnectionList: [],
};

const useMaintenanceStore = create(set => ({
  ...initialState,
  loadMaintenanceList: (search = '') => {
    set({loading: true});

    getDisconnectionListAPI(search)
      .then((res: any) => {
        set({disconnectionList: res});
      })
      .catch(() => {
        set({disconnectionList: []});
      });
    getReconnectionListAPI(search)
      .then((res: any) => {
        set({reconnectionList: res});
        set({loading: false});
      })
      .catch(() => {
        set({reconnectionList: []});
        set({loading: false});
      });
  },
  setSearchText: (text: string) => {
    set({searchText: text});
  },
}));

export default useMaintenanceStore;
