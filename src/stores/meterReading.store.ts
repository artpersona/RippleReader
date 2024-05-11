import {create} from 'zustand';
import {
  getReadingListAPI,
  getCompletedListAPI,
} from '../services/meterReadingAPI';
const initialState = {
  readingList: [],
  completedList: [],
};

const useMeterReadingStore = create(set => ({
  ...initialState,
  loadMeterReaderLists: () => {
    getReadingListAPI().then((res: any) => {
      set({readingList: res});
    });
    getCompletedListAPI().then((res: any) => {
      set({completedList: res});
    });
  },
}));

export default useMeterReadingStore;
