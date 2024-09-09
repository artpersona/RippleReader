import {create} from 'zustand';
import {
  getReadingListAPI,
  getCompletedListAPI,
  getClustersAPI,
} from '../services/meterReadingAPI';
const initialState = {
  readingList: [],
  completedList: [],
  clusters: [],
  activeClusters: [],
  tempClusters: [],
  searchText: '',
  loading: false,
};

const useMeterReadingStore = create(set => ({
  ...initialState,
  loadMeterReaderLists: (search = '', cluster = '') => {
    set({loading: true});

    getReadingListAPI(search, cluster).then((res: any) => {
      set({readingList: res});
    });
    getCompletedListAPI(search, cluster).then((res: any) => {
      set({completedList: res});
      set({loading: false});
    });
  },
  loadClusters: () => {
    getClustersAPI(false).then((res: any) => {
      set({clusters: res});
    });
  },
  setTempClusters: (clusters: any) => {
    set({tempClusters: clusters});
  },
  setActiveClusters: (clusters: any) => {
    set({activeClusters: clusters});
  },
  setSearchText: (text: string) => {
    set({searchText: text});
  },
}));

export default useMeterReadingStore;
