import {create} from 'zustand';
import {
  getReadingListAPI,
  getCompletedListAPI,
  getClustersAPI,
} from '../services/meterReadingAPI';

interface MeterReadingState {
  readingList: any[];
  completedList: any[];
  clusters: any[];
  activeClusters: any[];
  tempClusters: any[];
  searchText: string;
  loading: boolean;
  clearStore: () => void;
  loadMeterReaderLists: (search: string, cluster: string) => void;
  loadClusters: () => void;
  setTempClusters: (clusters: any) => void;
  setActiveClusters: (clusters: any) => void;
  setSearchText: (text: string) => void;
}

const initialState: Omit<
  MeterReadingState,
  | 'clearStore'
  | 'loadMeterReaderLists'
  | 'loadClusters'
  | 'setTempClusters'
  | 'setActiveClusters'
  | 'setSearchText'
> = {
  readingList: [],
  completedList: [],
  clusters: [],
  activeClusters: [],
  tempClusters: [],
  searchText: '',
  loading: false,
};

const useMeterReadingStore = create<MeterReadingState>(set => ({
  ...initialState,
  clearStore: () => set({...initialState}),
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
