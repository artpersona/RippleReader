import {create} from 'zustand';
import {
  getReadingListAPI,
  getCompletedListAPI,
  getClustersAPI,
  getSitesAPI,
} from '../services/meterReadingAPI';

interface MeterReadingState {
  readingList: any[];
  completedList: any[];
  clusters: any[];
  activeClusters: any[];
  tempClusters: any[];
  searchText: string;
  loading: boolean;
  activeProject: string;
  projects: any[];
  clearStore: () => void;
  loadMeterReaderLists: (
    search: string,
    cluster: string,
    activeClusterID: number,
  ) => void;
  loadClusters: (siteID: number) => void;
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
  activeProject: '',
  projects: [],
};

const useMeterReadingStore = create<MeterReadingState>(set => ({
  ...initialState,
  clearStore: () => set({...initialState}),

  loadUserProjects: () => {
    getSitesAPI().then((res: any) => {
      const defaultProject = res.find(
        (project: any) => project.is_default === '1',
      );
      set({activeProject: defaultProject?.project_id || ''});
      set({projects: res});
    });
  },

  setActiveProject: (project: string) => {
    set({activeProject: project});
  },

  loadMeterReaderLists: (
    search = '',
    cluster = '',
    activeProjectID: number,
  ) => {
    set({loading: true});

    getReadingListAPI(search, cluster, activeProjectID).then((res: any) => {
      set({readingList: res});
    });
    getCompletedListAPI(search, cluster, activeProjectID).then((res: any) => {
      set({completedList: res});
      set({loading: false});
    });
  },
  loadClusters: (siteID: number) => {
    getClustersAPI(false, siteID).then((res: any) => {
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
